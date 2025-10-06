// Mock real-time stock data service
export interface StockPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  lastUpdated: string;
}

export interface StockList {
  stocks: StockPrice[];
  lastUpdated: string;
}

// Comprehensive list of Indian stocks
const INDIAN_STOCKS = [
  // IT Sector
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', sector: 'Information Technology' },
  { symbol: 'INFY.NS', name: 'Infosys Limited', sector: 'Information Technology' },
  { symbol: 'WIPRO.NS', name: 'Wipro Limited', sector: 'Information Technology' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies', sector: 'Information Technology' },
  { symbol: 'TECHM.NS', name: 'Tech Mahindra', sector: 'Information Technology' },
  { symbol: 'LTI.NS', name: 'Larsen & Toubro Infotech', sector: 'Information Technology' },
  
  // Banking & Financial
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', sector: 'Banking' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', sector: 'Banking' },
  { symbol: 'SBIN.NS', name: 'State Bank of India', sector: 'Banking' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', sector: 'Banking' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank', sector: 'Banking' },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank', sector: 'Banking' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', sector: 'Financial Services' },
  { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance', sector: 'Financial Services' },
  
  // Oil & Gas
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', sector: 'Oil & Gas' },
  { symbol: 'ONGC.NS', name: 'Oil & Natural Gas Corporation', sector: 'Oil & Gas' },
  { symbol: 'IOC.NS', name: 'Indian Oil Corporation', sector: 'Oil & Gas' },
  { symbol: 'BPCL.NS', name: 'Bharat Petroleum Corporation', sector: 'Oil & Gas' },
  
  // Automobile
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India', sector: 'Automobile' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors', sector: 'Automobile' },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra', sector: 'Automobile' },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto', sector: 'Automobile' },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp', sector: 'Automobile' },
  
  // Pharmaceuticals
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries', sector: 'Pharmaceuticals' },
  { symbol: 'DRREDDY.NS', name: 'Dr. Reddys Laboratories', sector: 'Pharmaceuticals' },
  { symbol: 'CIPLA.NS', name: 'Cipla Limited', sector: 'Pharmaceuticals' },
  { symbol: 'DIVISLAB.NS', name: 'Divis Laboratories', sector: 'Pharmaceuticals' },
  { symbol: 'BIOCON.NS', name: 'Biocon Limited', sector: 'Pharmaceuticals' },
  
  // FMCG
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', sector: 'FMCG' },
  { symbol: 'ITC.NS', name: 'ITC Limited', sector: 'FMCG' },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India', sector: 'FMCG' },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries', sector: 'FMCG' },
  { symbol: 'DABUR.NS', name: 'Dabur India', sector: 'FMCG' },
  
  // Metals & Mining
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel', sector: 'Metals & Mining' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel', sector: 'Metals & Mining' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries', sector: 'Metals & Mining' },
  { symbol: 'VEDL.NS', name: 'Vedanta Limited', sector: 'Metals & Mining' },
  { symbol: 'COALINDIA.NS', name: 'Coal India', sector: 'Metals & Mining' },
  
  // Cement
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement', sector: 'Cement' },
  { symbol: 'SHREECEM.NS', name: 'Shree Cement', sector: 'Cement' },
  { symbol: 'GRASIM.NS', name: 'Grasim Industries', sector: 'Cement' },
  { symbol: 'ACC.NS', name: 'ACC Limited', sector: 'Cement' },
  
  // Power & Utilities
  { symbol: 'NTPC.NS', name: 'NTPC Limited', sector: 'Power' },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation', sector: 'Power' },
  { symbol: 'ADANIPOWER.NS', name: 'Adani Power', sector: 'Power' },
  
  // Telecom
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel', sector: 'Telecom' },
  { symbol: 'IDEA.NS', name: 'Vodafone Idea', sector: 'Telecom' },
  
  // Consumer Durables
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv', sector: 'Financial Services' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro', sector: 'Construction' },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints', sector: 'Paints' },
  
  // Others
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy', sector: 'Renewable Energy' },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports and SEZ', sector: 'Infrastructure' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors', sector: 'Automobile' },
  { symbol: 'TITAN.NS', name: 'Titan Company', sector: 'Consumer Goods' }
];

// Generate realistic mock prices
const generateMockPrice = (basePrice: number): StockPrice => {
  const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
  const price = basePrice * (1 + variation);
  const change = basePrice * variation;
  const changePercent = variation * 100;
  
  return {
    symbol: '',
    name: '',
    price: Math.round(price * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    volume: Math.floor(Math.random() * 10000000) + 100000,
    marketCap: Math.floor(Math.random() * 1000000) + 50000,
    sector: '',
    lastUpdated: new Date().toISOString()
  };
};

// Base prices for different stocks (in INR)
const BASE_PRICES: { [key: string]: number } = {
  'TCS.NS': 3500,
  'INFY.NS': 1450,
  'WIPRO.NS': 420,
  'HCLTECH.NS': 1180,
  'TECHM.NS': 1050,
  'LTI.NS': 4200,
  'HDFCBANK.NS': 1650,
  'ICICIBANK.NS': 950,
  'SBIN.NS': 580,
  'KOTAKBANK.NS': 1750,
  'AXISBANK.NS': 720,
  'INDUSINDBK.NS': 1320,
  'BAJFINANCE.NS': 6800,
  'HDFCLIFE.NS': 620,
  'RELIANCE.NS': 2450,
  'ONGC.NS': 180,
  'IOC.NS': 85,
  'BPCL.NS': 320,
  'MARUTI.NS': 9200,
  'TATAMOTORS.NS': 450,
  'M&M.NS': 1380,
  'BAJAJ-AUTO.NS': 4200,
  'HEROMOTOCO.NS': 2800,
  'SUNPHARMA.NS': 920,
  'DRREDDY.NS': 4800,
  'CIPLA.NS': 1050,
  'DIVISLAB.NS': 3600,
  'BIOCON.NS': 280,
  'HINDUNILVR.NS': 2650,
  'ITC.NS': 420,
  'NESTLEIND.NS': 18500,
  'BRITANNIA.NS': 4800,
  'DABUR.NS': 580,
  'TATASTEEL.NS': 120,
  'JSWSTEEL.NS': 680,
  'HINDALCO.NS': 420,
  'VEDL.NS': 280,
  'COALINDIA.NS': 180,
  'ULTRACEMCO.NS': 7200,
  'SHREECEM.NS': 24000,
  'GRASIM.NS': 1650,
  'ACC.NS': 2100,
  'NTPC.NS': 180,
  'POWERGRID.NS': 220,
  'ADANIPOWER.NS': 320,
  'BHARTIARTL.NS': 850,
  'IDEA.NS': 12,
  'BAJAJFINSV.NS': 1580,
  'LT.NS': 2200,
  'ASIANPAINT.NS': 3200,
  'ADANIGREEN.NS': 1200,
  'ADANIPORTS.NS': 780,
  'EICHERMOT.NS': 3400,
  'TITAN.NS': 2800
};

export class StockDataService {
  private static instance: StockDataService;
  private stockData: Map<string, StockPrice> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;
  private subscribers: ((data: StockList) => void)[] = [];

  static getInstance(): StockDataService {
    if (!StockDataService.instance) {
      StockDataService.instance = new StockDataService();
    }
    return StockDataService.instance;
  }

  constructor() {
    this.initializeData();
    this.startRealTimeUpdates();
  }

  private initializeData(): void {
    INDIAN_STOCKS.forEach(stock => {
      const basePrice = BASE_PRICES[stock.symbol] || 100;
      const priceData = generateMockPrice(basePrice);
      
      this.stockData.set(stock.symbol, {
        ...priceData,
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector
      });
    });
  }

  private startRealTimeUpdates(): void {
    // Update prices every 5 seconds
    this.updateInterval = setInterval(() => {
      this.updatePrices();
      this.notifySubscribers();
    }, 5000);
  }

  private updatePrices(): void {
    this.stockData.forEach((stock, symbol) => {
      const basePrice = BASE_PRICES[symbol] || 100;
      const newPriceData = generateMockPrice(basePrice);
      
      this.stockData.set(symbol, {
        ...stock,
        ...newPriceData,
        lastUpdated: new Date().toISOString()
      });
    });
  }

  private notifySubscribers(): void {
    const stockList: StockList = {
      stocks: Array.from(this.stockData.values()),
      lastUpdated: new Date().toISOString()
    };
    
    this.subscribers.forEach(callback => callback(stockList));
  }

  public subscribe(callback: (data: StockList) => void): () => void {
    this.subscribers.push(callback);
    
    // Send initial data
    const stockList: StockList = {
      stocks: Array.from(this.stockData.values()),
      lastUpdated: new Date().toISOString()
    };
    callback(stockList);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  public getAllStocks(): StockPrice[] {
    return Array.from(this.stockData.values());
  }

  public getStock(symbol: string): StockPrice | undefined {
    return this.stockData.get(symbol);
  }

  public getStocksBysector(sector: string): StockPrice[] {
    return Array.from(this.stockData.values()).filter(stock => stock.sector === sector);
  }

  public getTopGainers(limit: number = 10): StockPrice[] {
    return Array.from(this.stockData.values())
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, limit);
  }

  public getTopLosers(limit: number = 10): StockPrice[] {
    return Array.from(this.stockData.values())
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, limit);
  }

  public searchStocks(query: string): StockPrice[] {
    const searchTerm = query.toLowerCase();
    return Array.from(this.stockData.values()).filter(stock =>
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.sector.toLowerCase().includes(searchTerm)
    );
  }

  public destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.subscribers = [];
  }
}

export const stockDataService = StockDataService.getInstance();