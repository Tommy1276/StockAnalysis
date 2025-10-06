const API_BASE_URL = 'http://localhost:5000/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
}

export interface StockChartData {
  date: string;
  price: number;
  volume: number;
}

export interface StockAnalysisData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  fundamentals: {
    marketCap: string;
    pe: number;
    pb: number;
    roe: number;
    debt: number;
    revenue: string;
    netProfit: string;
    eps: number;
    bookValue: number;
    dividendYield: number;
    revenueGrowth: number;
    profitGrowth: number;
    currentRatio: number;
    quickRatio: number;
    operatingMargin: number;
    netMargin: number;
    debtToEquity: number;
    profitMargin: number;
    fundamentalScore: number;
    fundamentalAnalysis: string[];
    analysis: {
      strengths: string[];
      weaknesses: string[];
      valuation: string;
      financialHealth: string;
      growthProspects: string;
    };
  };
  technicals: {
    rsi: number;
    macd: number;
    sma20: number;
    sma50: number;
    sma200: number;
    support: number;
    resistance: number;
    trend: string;
    bollingerUpper: number;
    bollingerLower: number;
    stochastic: number;
    adx: number;
    volume: number;
    volumeAvg: number;
    technicalScore: number;
    technicalAnalysis: string[];
    analysis: {
      trendAnalysis: string;
      momentumIndicators: string;
      supportResistance: string;
      volumeAnalysis: string;
      signals: string[];
    };
  };
  news: Array<{
    title: string;
    summary: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    date: string;
    source: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  sentiment: {
    overall: 'bullish' | 'bearish' | 'neutral';
    score: number;
    socialMediaMentions: number;
    analystRatings: {
      buy: number;
      hold: number;
      sell: number;
    };
    sentimentAnalysis: string[];
  };
  sentimentAnalysis: {
    overallSentiment: 'bullish' | 'bearish' | 'neutral';
    sentimentScore: number;
    socialMediaBuzz: number;
    analystRatings: {
      buy: number;
      hold: number;
      sell: number;
    };
    priceTargets: {
      average: number;
      high: number;
      low: number;
    };
  };
  peerComparison: {
    peers: Array<{
      symbol: string;
      name: string;
      pe: number;
      pb: number;
      roe: number;
      marketCap: string;
      price: number;
      change: number;
      debtToEquity: number;
    }>;
    industryAverages: {
      pe: number;
      pb: number;
      roe: number;
      debtToEquity: number;
      operatingMargin: number;
    };
    industryAverage: {
      pe: number;
      roe: number;
      debtToEquity: number;
      profitMargin: number;
    };
    ranking: {
      position: number;
      totalCompanies: number;
      category: string;
    };
    comparisonAnalysis: string[];
    analysis: {
      relativeValuation: string;
      competitivePosition: string;
      marketShare: string;
    };
  };
  recommendation: {
    action: 'BUY' | 'HOLD' | 'SELL';
    score: number;
    reasons: string[];
    timeHorizon: string;
    targetPrice: number;
    stopLoss: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Mock Authentication methods (works without backend)
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Try real API first
      return await this.request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      // Fallback to mock authentication
      console.log('Backend unavailable, using mock authentication');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          message: 'Email and password are required'
        };
      }
      
      if (credentials.password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters'
        };
      }
      
      // Mock successful login
      const mockUser: User = {
        id: 'mock-user-' + Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        success: true,
        user: mockUser,
        token: 'mock-jwt-token',
        message: 'Login successful'
      };
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      // Try real API first
      return await this.request<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      // Fallback to mock authentication
      console.log('Backend unavailable, using mock authentication');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!credentials.name || !credentials.email || !credentials.password) {
        return {
          success: false,
          message: 'All fields are required'
        };
      }
      
      if (credentials.password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters'
        };
      }
      
      if (!credentials.email.includes('@')) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        };
      }
      
      // Mock successful signup
      const mockUser: User = {
        id: 'mock-user-' + Date.now(),
        name: credentials.name,
        email: credentials.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        success: true,
        user: mockUser,
        token: 'mock-jwt-token',
        message: 'Account created successfully'
      };
    }
  }

  async logout(): Promise<{ success: boolean }> {
    try {
      // Try real API first
      return await this.request<{ success: boolean }>('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Fallback to mock logout
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      return {
        success: true
      };
    }
  }

  async getCurrentUser(): Promise<{ user: User | null }> {
    try {
      // Try real API first
      return await this.request<{ user: User | null }>('/auth/me');
    } catch (error) {
      // Fallback to localStorage
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          return { user };
        } catch (e) {
          return { user: null };
        }
      }
      
      return { user: null };
    }
  }

  // Google OAuth
  getGoogleAuthUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  }

  // Stock API methods
  async getStockData(symbol: string): Promise<StockData> {
    return this.request<StockData>(`/stocks/${symbol}`);
  }

  async getStockChart(symbol: string, period: string = '1M'): Promise<StockChartData[]> {
    return this.request<StockChartData[]>(`/stocks/${symbol}/chart?period=${period}`);
  }

  async searchStocks(query: string): Promise<StockData[]> {
    return this.request<StockData[]>(`/stocks/search?q=${query}`);
  }

  // Comprehensive Stock Analysis method with mock data fallback
  async getStockAnalysis(symbol: string): Promise<StockAnalysisData> {
    try {
      // Try to fetch from real API first
      return await this.request<StockAnalysisData>(`/stocks/${symbol}/analysis`);
    } catch (error) {
      // If API fails, return comprehensive mock data
      console.log('API unavailable, using comprehensive mock data for', symbol);
      return this.generateComprehensiveStockAnalysis(symbol);
    }
  }

  private generateComprehensiveStockAnalysis(symbol: string): StockAnalysisData {
    const basePrice = Math.random() * 2000 + 500;
    const change = (Math.random() - 0.5) * 100;
    const changePercent = (change / basePrice) * 100;
    
    // Company data
    const companyData: { [key: string]: { name: string; sector: string; peers: string[] } } = {
      'INFY.NS': { 
        name: 'Infosys Limited', 
        sector: 'IT Services',
        peers: ['TCS.NS', 'WIPRO.NS', 'HCLTECH.NS', 'TECHM.NS']
      },
      'TCS.NS': { 
        name: 'Tata Consultancy Services', 
        sector: 'IT Services',
        peers: ['INFY.NS', 'WIPRO.NS', 'HCLTECH.NS', 'TECHM.NS']
      },
      'RELIANCE.NS': { 
        name: 'Reliance Industries Limited', 
        sector: 'Oil & Gas',
        peers: ['ONGC.NS', 'IOC.NS', 'BPCL.NS', 'HINDPETRO.NS']
      },
      'HDFCBANK.NS': { 
        name: 'HDFC Bank Limited', 
        sector: 'Banking',
        peers: ['ICICIBANK.NS', 'SBIN.NS', 'KOTAKBANK.NS', 'AXISBANK.NS']
      },
    };
    
    const company = companyData[symbol] || { 
      name: `${symbol.replace('.NS', '')} Limited`, 
      sector: 'Diversified',
      peers: ['STOCK1.NS', 'STOCK2.NS', 'STOCK3.NS', 'STOCK4.NS']
    };
    
    // Generate comprehensive fundamental data
    const pe = Math.random() * 30 + 10;
    const pb = Math.random() * 5 + 1;
    const roe = Math.random() * 25 + 5;
    const debt = Math.random() * 2;
    const eps = basePrice / pe;
    const bookValue = basePrice / pb;
    const dividendYield = Math.random() * 5;
    const revenueGrowth = (Math.random() - 0.3) * 50; // -15% to +35%
    const profitGrowth = (Math.random() - 0.2) * 60; // -12% to +48%
    const profitMargin = Math.random() * 20 + 5;
    const fundamentalScore = Math.floor(Math.random() * 40) + 60;
    
    // Generate technical indicators
    const rsi = Math.random() * 100;
    const macd = (Math.random() - 0.5) * 10;
    const sma20 = basePrice * (0.95 + Math.random() * 0.1);
    const sma50 = basePrice * (0.9 + Math.random() * 0.2);
    const sma200 = basePrice * (0.8 + Math.random() * 0.4);
    const technicalScore = Math.floor(Math.random() * 40) + 60;
    
    // Generate sentiment data
    const sentimentScore = Math.random() * 100;
    const overallSentiment = sentimentScore > 60 ? 'bullish' : sentimentScore < 40 ? 'bearish' : 'neutral';
    
    // Generate peer comparison
    const peers = company.peers.map(peerSymbol => ({
      symbol: peerSymbol,
      name: companyData[peerSymbol]?.name || `${peerSymbol.replace('.NS', '')} Limited`,
      pe: Math.random() * 30 + 10,
      pb: Math.random() * 5 + 1,
      roe: Math.random() * 25 + 5,
      marketCap: `₹${Math.floor(Math.random() * 500000 + 50000).toLocaleString()} Cr`,
      price: Math.random() * 2000 + 500,
      change: (Math.random() - 0.5) * 100,
      debtToEquity: Math.random() * 2
    }));
    
    // Generate recommendation
    const overallScore = Math.floor((fundamentalScore + technicalScore + sentimentScore) / 3);
    let action: 'BUY' | 'HOLD' | 'SELL' = 'HOLD';
    let reasons: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    
    if (overallScore >= 80) {
      action = 'BUY';
      riskLevel = 'low';
      reasons = [
        'Strong financial performance with consistent growth',
        'Positive technical momentum and breakout patterns',
        'Favorable industry outlook and market positioning',
        'Attractive valuation compared to peers',
        'Strong management and corporate governance'
      ];
    } else if (overallScore >= 65) {
      action = 'HOLD';
      riskLevel = 'medium';
      reasons = [
        'Stable fundamentals with mixed growth signals',
        'Neutral technical indicators with range-bound movement',
        'Market uncertainty affecting sector performance',
        'Fair valuation with limited upside potential',
        'Wait for better entry point or catalyst'
      ];
    } else {
      action = 'SELL';
      riskLevel = 'high';
      reasons = [
        'Declining financial metrics and margin pressure',
        'Weak technical momentum with bearish signals',
        'Sector headwinds and competitive challenges',
        'Overvalued compared to growth prospects',
        'Better investment opportunities available elsewhere'
      ];
    }

    // Generate comprehensive news
    const newsItems = [
      {
        title: `${company.name} announces strong Q3 results, beats estimates`,
        summary: 'Company reported revenue growth of 15% YoY with improved operating margins and strong order book.',
        sentiment: 'positive' as const,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        source: 'Economic Times',
        impact: 'high' as const
      },
      {
        title: `Analysts upgrade ${symbol} on digital transformation wins`,
        summary: 'Multiple brokerages raise target price citing strong client additions and margin expansion.',
        sentiment: 'positive' as const,
        date: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        source: 'Bloomberg',
        impact: 'medium' as const
      },
      {
        title: `${company.sector} sector faces regulatory challenges`,
        summary: 'New regulations may impact sector growth, companies adapting strategies accordingly.',
        sentiment: 'neutral' as const,
        date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        source: 'Reuters',
        impact: 'medium' as const
      },
      {
        title: `${company.name} expands international operations`,
        summary: 'Company announces new partnerships and market expansion plans in key geographies.',
        sentiment: 'positive' as const,
        date: new Date(Date.now() - Math.random() * 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        source: 'Business Standard',
        impact: 'low' as const
      }
    ];

    return {
      symbol,
      name: company.name,
      price: basePrice,
      change,
      changePercent,
      fundamentals: {
        marketCap: `₹${Math.floor(Math.random() * 500000 + 50000).toLocaleString()} Cr`,
        pe: pe,
        pb: pb,
        roe: roe,
        debt: debt,
        revenue: `₹${Math.floor(Math.random() * 50000 + 10000).toLocaleString()} Cr`,
        netProfit: `₹${Math.floor(Math.random() * 8000 + 1000).toLocaleString()} Cr`,
        eps: eps,
        bookValue: bookValue,
        dividendYield: dividendYield,
        revenueGrowth: revenueGrowth,
        profitGrowth: profitGrowth,
        currentRatio: Math.random() * 3 + 1,
        quickRatio: Math.random() * 2 + 0.5,
        operatingMargin: Math.random() * 30 + 10,
        netMargin: Math.random() * 20 + 5,
        debtToEquity: debt,
        profitMargin: profitMargin,
        fundamentalScore: fundamentalScore,
        fundamentalAnalysis: [
          `P/E ratio of ${pe.toFixed(1)} indicates ${pe < 15 ? 'undervalued' : pe < 25 ? 'fairly valued' : 'overvalued'} stock`,
          `ROE of ${roe.toFixed(1)}% shows ${roe > 15 ? 'excellent' : roe > 10 ? 'good' : 'average'} management efficiency`,
          `Current ratio indicates ${Math.random() > 0.5 ? 'strong' : 'adequate'} liquidity position`,
          `Profit margin of ${profitMargin.toFixed(1)}% demonstrates ${profitMargin > 15 ? 'excellent' : profitMargin > 10 ? 'good' : 'moderate'} operational efficiency`
        ],
        analysis: {
          strengths: [
            'Strong market position and brand recognition',
            'Consistent revenue growth and profitability',
            'Robust balance sheet with low debt levels',
            'Experienced management team',
            'Diversified revenue streams'
          ],
          weaknesses: [
            'High dependency on key clients/markets',
            'Margin pressure from competition',
            'Currency fluctuation risks',
            'Regulatory compliance costs'
          ],
          valuation: pe > 25 ? 'Expensive' : pe > 15 ? 'Fair' : 'Attractive',
          financialHealth: roe > 15 && debt < 1 ? 'Strong' : 'Moderate',
          growthProspects: revenueGrowth > 15 ? 'Excellent' : revenueGrowth > 5 ? 'Good' : 'Moderate'
        }
      },
      technicals: {
        rsi: rsi,
        macd: macd,
        sma20: sma20,
        sma50: sma50,
        sma200: sma200,
        support: basePrice * 0.9,
        resistance: basePrice * 1.1,
        trend: rsi > 50 ? 'Bullish' : 'Bearish',
        bollingerUpper: basePrice * 1.05,
        bollingerLower: basePrice * 0.95,
        stochastic: Math.random() * 100,
        adx: Math.random() * 100,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        volumeAvg: Math.floor(Math.random() * 8000000) + 1500000,
        technicalScore: technicalScore,
        technicalAnalysis: [
          `RSI at ${rsi.toFixed(1)} suggests stock is ${rsi > 70 ? 'overbought' : rsi < 30 ? 'oversold' : 'in neutral zone'}`,
          `MACD signal shows ${macd > 0 ? 'bullish' : 'bearish'} momentum with value of ${macd.toFixed(2)}`,
          `Price trading ${basePrice > sma20 ? 'above' : 'below'} 20-day SMA indicates ${basePrice > sma20 ? 'short-term strength' : 'short-term weakness'}`,
          `Support at ₹${(basePrice * 0.9).toFixed(2)} and resistance at ₹${(basePrice * 1.1).toFixed(2)} define key trading levels`
        ],
        analysis: {
          trendAnalysis: rsi > 70 ? 'Strong uptrend with overbought conditions' : 
                        rsi < 30 ? 'Downtrend with oversold conditions' : 
                        'Sideways movement with neutral momentum',
          momentumIndicators: 'RSI and MACD showing ' + (rsi > 50 ? 'bullish' : 'bearish') + ' signals',
          supportResistance: `Key support at ₹${(basePrice * 0.9).toFixed(2)}, resistance at ₹${(basePrice * 1.1).toFixed(2)}`,
          volumeAnalysis: 'Volume levels ' + (Math.random() > 0.5 ? 'above' : 'below') + ' average, indicating ' + 
                         (Math.random() > 0.5 ? 'strong' : 'weak') + ' participation',
          signals: [
            rsi > 70 ? 'Overbought - Consider profit booking' : rsi < 30 ? 'Oversold - Potential buying opportunity' : 'Neutral momentum',
            macd > 0 ? 'MACD bullish crossover' : 'MACD bearish crossover',
            'Price ' + (basePrice > sma20 ? 'above' : 'below') + ' short-term moving average'
          ]
        }
      },
      news: newsItems,
      sentiment: {
        overall: overallSentiment,
        score: sentimentScore,
        socialMediaMentions: Math.floor(Math.random() * 10000) + 1000,
        analystRatings: {
          buy: Math.floor(Math.random() * 15) + 5,
          hold: Math.floor(Math.random() * 10) + 3,
          sell: Math.floor(Math.random() * 5) + 1
        },
        sentimentAnalysis: [
          `Overall market sentiment is ${overallSentiment} with ${sentimentScore.toFixed(0)}% positive indicators`,
          `Social media mentions trending ${sentimentScore > 60 ? 'positively' : 'negatively'} over past week`,
          `Analyst consensus shows ${sentimentScore > 70 ? 'strong buy' : sentimentScore > 50 ? 'moderate buy' : 'hold'} recommendation`,
          `Institutional investor activity indicates ${sentimentScore > 65 ? 'accumulation' : 'distribution'} pattern`
        ]
      },
      sentimentAnalysis: {
        overallSentiment: overallSentiment,
        sentimentScore: sentimentScore,
        socialMediaBuzz: Math.random() * 100,
        analystRatings: {
          buy: Math.floor(Math.random() * 15) + 5,
          hold: Math.floor(Math.random() * 10) + 3,
          sell: Math.floor(Math.random() * 5) + 1
        },
        priceTargets: {
          average: basePrice * (1 + (Math.random() - 0.3) * 0.4),
          high: basePrice * (1.1 + Math.random() * 0.3),
          low: basePrice * (0.8 + Math.random() * 0.2)
        }
      },
      peerComparison: {
        peers: peers,
        industryAverages: {
          pe: 20.5,
          pb: 3.2,
          roe: 16.8,
          debtToEquity: 0.8,
          operatingMargin: 18.5
        },
        industryAverage: {
          pe: 22.5,
          roe: 18.2,
          debtToEquity: 0.45,
          profitMargin: 12.8
        },
        ranking: {
          position: Math.floor(Math.random() * 50) + 1,
          totalCompanies: 150,
          category: company.sector
        },
        comparisonAnalysis: [
          `Company ranks in top ${Math.floor(Math.random() * 30) + 20}% of ${company.sector} sector`,
          `P/E ratio ${pe < 22.5 ? 'below' : 'above'} industry average of 22.5x`,
          `ROE performance ${roe > 18.2 ? 'outperforms' : 'underperforms'} sector median of 18.2%`,
          `Debt levels are ${debt < 0.45 ? 'conservative' : 'higher than'} industry standard`
        ],
        analysis: {
          relativeValuation: pe > 22 ? 'Premium valuation compared to peers' : 
                           pe < 15 ? 'Discount to peer average' : 'In line with sector average',
          competitivePosition: roe > 18 ? 'Strong competitive position' : 'Average market position',
          marketShare: 'Leading player in ' + company.sector + ' segment with significant market presence'
        }
      },
      recommendation: {
        action,
        score: overallScore,
        reasons,
        timeHorizon: '6-12 months',
        targetPrice: basePrice * (action === 'BUY' ? 1.15 : action === 'SELL' ? 0.85 : 1.05),
        stopLoss: basePrice * (action === 'BUY' ? 0.9 : action === 'SELL' ? 1.1 : 0.95),
        riskLevel
      }
    };
  }
}

export const apiService = new ApiService();
export const stockApi = apiService;
export default apiService;