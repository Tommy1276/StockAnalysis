const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const stockService = require('./services/stockService');
const Stock = require('./models/Stock');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (optional - will work without database)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stocksense';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error (continuing without DB):', err.message));

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'StockSense API is running' });
});

// Get complete stock analysis
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log(`Fetching analysis for ${symbol}`);
    
    // Try to get from cache first
    let cachedData = null;
    try {
      cachedData = await Stock.findOne({ symbol }).sort({ updatedAt: -1 });
      if (cachedData && (Date.now() - cachedData.updatedAt) < 300000) { // 5 minutes cache
        return res.json(cachedData.data);
      }
    } catch (dbError) {
      console.log('Database not available, proceeding without cache');
    }

    // Generate fresh analysis
    const analysis = await stockService.getCompleteAnalysis(symbol);
    
    // Try to cache the result
    try {
      await Stock.findOneAndUpdate(
        { symbol },
        { symbol, data: analysis, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    } catch (dbError) {
      console.log('Could not cache data, continuing without database');
    }

    res.json(analysis);
  } catch (error) {
    console.error('Error in /api/stock/:symbol:', error);
    res.status(500).json({ error: 'Failed to fetch stock analysis' });
  }
});

// Get chart data
app.get('/api/chart/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const chartData = await stockService.getChartData(symbol);
    res.json(chartData);
  } catch (error) {
    console.error('Error in /api/chart/:symbol:', error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

// Get fundamentals only
app.get('/api/fundamentals/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const fundamentals = await stockService.getFundamentals(symbol);
    res.json(fundamentals);
  } catch (error) {
    console.error('Error in /api/fundamentals/:symbol:', error);
    res.status(500).json({ error: 'Failed to fetch fundamentals' });
  }
});

// Get technicals only
app.get('/api/technicals/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const technicals = await stockService.getTechnicals(symbol);
    res.json(technicals);
  } catch (error) {
    console.error('Error in /api/technicals/:symbol:', error);
    res.status(500).json({ error: 'Failed to fetch technicals' });
  }
});

// Get news and sentiment
app.get('/api/news/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const news = await stockService.getNews(symbol);
    res.json(news);
  } catch (error) {
    console.error('Error in /api/news/:symbol:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`StockSense API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;