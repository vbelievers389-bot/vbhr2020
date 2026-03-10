// Add this after mongoose.connect()

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Connected');
  // Verify critical collections exist
  verifyCollections();
});

async function verifyCollections() {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('📦 Collections:', collectionNames);
    
    if (!collectionNames.includes('applications')) {
      console.warn('⚠️ WARNING: Applications collection missing!');
    }
  } catch (err) {
    console.error('Collection check failed:', err);
  }
}

// Add safety check before delete operations
router.delete("/applications/:id", async (req, res) => {
  try {
    // Double-check: only soft delete (mark as deleted)
    const app = await Application.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ error: "Application not found" });
    }
    
    await Application.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Moved to bin (data preserved)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
