const axios = require('axios');

class StockService {
  constructor() {
    this.companyNames = {
      'INFY.NS': 'Infosys Limited',
      'TCS.NS': 'Tata Consultancy Services Limited',
      'RELIANCE.NS': 'Reliance Industries Limited',
      'HDFCBANK.NS': 'HDFC Bank Limited',
      'WIPRO.NS': 'Wipro Limited',
      'ICICIBANK.NS': 'ICICI Bank Limited',
      'SBIN.NS': 'State Bank of India',
      'BHARTIARTL.NS': 'Bharti Airtel Limited'
    };
  }

  async getCompleteAnalysis(symbol) {
    try {
      console.log(`Generating complete analysis for ${symbol}`);
      
      // For MVP, we'll use mock data with some randomization
      // In production, this would call real APIs
      const analysis = {
        symbol: symbol,
        name: this.getCompanyName(symbol),
        price: this.generatePrice(),
        change: 0,
        changePercent: 0,
        fundamentals: await this.getFundamentals(symbol),
        technicals: await this.getTechnicals(symbol),
        news: await this.getNews(symbol),
        recommendation: null
      };

      // Calculate price change
      analysis.change = (Math.random() - 0.5) * 100;
      analysis.changePercent = (analysis.change / analysis.price) * 100;

      // Generate recommendation based on analysis
      analysis.recommendation = this.generateRecommendation(analysis);

      return analysis;
    } catch (error) {
      console.error('Error in getCompleteAnalysis:', error);
      throw error;
    }
  }

  async getFundamentals(symbol) {
    // Mock fundamental data - in production, fetch from financial APIs
    return {
      marketCap: this.generateMarketCap(),
      pe: this.generateRandomInRange(15, 35),
      pb: this.generateRandomInRange(2, 12),
      roe: this.generateRandomInRange(10, 30),
      debt: this.generateRandomInRange(0.1, 0.8),
      revenue: this.generateRevenue()
    };
  }

  async getTechnicals(symbol) {
    const currentPrice = this.generatePrice();
    
    return {
      rsi: this.generateRandomInRange(30, 70),
      macd: this.generateRandomInRange(-20, 20),
      sma20: currentPrice * this.generateRandomInRange(0.95, 1.05),
      sma50: currentPrice * this.generateRandomInRange(0.90, 1.10),
      support: currentPrice * this.generateRandomInRange(0.85, 0.95),
      resistance: currentPrice * this.generateRandomInRange(1.05, 1.15),
      trend: this.getRandomTrend()
    };
  }

  async getNews(symbol) {
    const newsTemplates = [
      {
        title: `${this.getCompanyName(symbol)} reports strong quarterly earnings`,
        summary: 'The company exceeded analyst expectations with robust revenue growth and improved margins.',
        sentiment: 'positive'
      },
      {
        title: `New strategic partnership announced by ${this.getCompanyName(symbol)}`,
        summary: 'The partnership is expected to drive innovation and expand market presence.',
        sentiment: 'positive'
      },
      {
        title: 'Market volatility affects sector performance',
        summary: 'Global economic concerns continue to impact market sentiment across the sector.',
        sentiment: 'neutral'
      },
      {
        title: `${this.getCompanyName(symbol)} invests in digital transformation`,
        summary: 'Significant investment in technology infrastructure to enhance operational efficiency.',
        sentiment: 'positive'
      },
      {
        title: 'Regulatory changes may impact industry dynamics',
        summary: 'New regulations could affect operational costs and compliance requirements.',
        sentiment: 'neutral'
      }
    ];

    // Return 3-5 random news items
    const shuffled = newsTemplates.sort(() => 0.5 - Math.random());
    const selectedNews = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);

    return selectedNews.map(news => ({
      ...news,
      date: this.getRandomRecentDate()
    }));
  }

  async getChartData(symbol) {
    const data = [];
    const basePrice = this.generatePrice();
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const randomChange = (Math.random() - 0.5) * 100;
      const price = basePrice + randomChange + (Math.sin(i / 5) * 50);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(price, basePrice * 0.7),
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    return data;
  }

  generateRecommendation(analysis) {
    let score = 50; // Base score
    
    // Factor in fundamentals (40% weight)
    if (analysis.fundamentals.pe < 25) score += 10;
    if (analysis.fundamentals.roe > 15) score += 10;
    if (analysis.fundamentals.debt < 0.5) score += 10;
    if (analysis.fundamentals.pb < 5) score += 5;
    
    // Factor in technicals (30% weight)
    if (analysis.technicals.rsi > 30 && analysis.technicals.rsi < 70) score += 8;
    if (analysis.technicals.trend === 'Bullish') score += 12;
    if (analysis.technicals.macd > 0) score += 5;
    
    // Factor in sentiment (30% weight)
    const positiveNews = analysis.news.filter(n => n.sentiment === 'positive').length;
    const negativeNews = analysis.news.filter(n => n.sentiment === 'negative').length;
    score += (positiveNews - negativeNews) * 5;
    
    // Determine action
    let action = 'HOLD';
    if (score >= 75) action = 'BUY';
    else if (score <= 40) action = 'SELL';
    
    // Generate reasons
    const reasons = [];
    if (analysis.fundamentals.pe < 25) reasons.push('Attractive P/E valuation');
    if (analysis.fundamentals.roe > 15) reasons.push('Strong return on equity');
    if (analysis.technicals.trend === 'Bullish') reasons.push('Positive technical momentum');
    if (positiveNews > negativeNews) reasons.push('Favorable news sentiment');
    
    // Ensure we have at least 3 reasons
    while (reasons.length < 3) {
      const genericReasons = [
        'Stable financial position',
        'Good sector fundamentals',
        'Reasonable debt levels',
        'Consistent performance track record'
      ];
      const randomReason = genericReasons[Math.floor(Math.random() * genericReasons.length)];
      if (!reasons.includes(randomReason)) {
        reasons.push(randomReason);
      }
    }
    
    return {
      action,
      score: Math.min(Math.max(score, 0), 100),
      reasons: reasons.slice(0, 4),
      timeHorizon: score >= 70 ? 'Medium to Long term (6-18 months)' : 
                   score >= 50 ? 'Short to Medium term (3-12 months)' : 
                   'Short term (1-6 months)'
    };
  }

  // Helper methods
  getCompanyName(symbol) {
    return this.companyNames[symbol] || `${symbol.replace('.NS', '')} Limited`;
  }

  generatePrice() {
    return Math.floor(Math.random() * 2000) + 500; // Price between 500-2500
  }

  generateRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  generateMarketCap() {
    const value = Math.floor(Math.random() * 500000) + 50000; // 50K to 550K crores
    return `₹${(value / 1000).toFixed(0)},${(value % 1000).toString().padStart(3, '0')} Cr`;
  }

  generateRevenue() {
    const value = Math.floor(Math.random() * 200000) + 10000; // 10K to 210K crores
    return `₹${(value / 1000).toFixed(0)},${(value % 1000).toString().padStart(3, '0')} Cr`;
  }

  getRandomTrend() {
    const trends = ['Bullish', 'Bearish', 'Sideways'];
    return trends[Math.floor(Math.random() * trends.length)];
  }

  getRandomRecentDate() {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 7) + 1; // 1-7 days ago
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  }
}

module.exports = new StockService();