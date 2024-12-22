import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import MACD, SMAIndicator, EMAIndicator
from flask import Flask, jsonify
import matplotlib.pyplot as plt

# Flask App Setup
app = Flask(__name__)

# Function to calculate technical indicators
def calculate_indicators(data):
    # RSI (Relative Strength Index)
    data['RSI'] = RSIIndicator(data['Close'], window=14).rsi()

    # SMA (Simple Moving Average)
    data['SMA_50'] = SMAIndicator(data['Close'], window=50).sma_indicator()
    data['SMA_200'] = SMAIndicator(data['Close'], window=200).sma_indicator()

    # EMA (Exponential Moving Average)
    data['EMA_50'] = EMAIndicator(data['Close'], window=50).ema_indicator()

    # MACD (Moving Average Convergence Divergence)
    macd = MACD(data['Close'])
    data['MACD'] = macd.macd()
    data['MACD_Signal'] = macd.macd_signal()

    return data

# Function to generate trading signals
def generate_signals(data):
    data['Signal'] = 'Hold'
    data.loc[data['SMA_50'] > data['SMA_200'], 'Signal'] = 'Buy'
    data.loc[data['SMA_50'] < data['SMA_200'], 'Signal'] = 'Sell'
    return data

# Route to fetch analysis data
@app.route('/api/analysis', methods=['GET'])
def analysis():
    # Load and prepare data
    data = pd.read_csv('data.csv', parse_dates=['Date'])
    data.set_index('Date', inplace=True)

    # Calculate indicators and signals
    data = calculate_indicators(data)
    data = generate_signals(data)

    # Convert keys to string to avoid JSON serialization error
    result = {
        str(date): row for date, row in data[['Close', 'RSI', 'SMA_50', 'SMA_200', 'Signal']].tail(10).iterrows()
    }
    return jsonify(result)

# Function to visualize analysis
def visualize(data):
    plt.figure(figsize=(14, 7))
    plt.plot(data.index, data['Close'], label='Stock Price', color='blue')
    plt.plot(data.index, data['SMA_50'], label='SMA 50', linestyle='--', color='orange')
    plt.plot(data.index, data['SMA_200'], label='SMA 200', linestyle='--', color='red')

    # Mark Buy and Sell signals
    buy_signals = data[data['Signal'] == 'Buy']
    sell_signals = data[data['Signal'] == 'Sell']
    plt.scatter(buy_signals.index, buy_signals['Close'], label='Buy Signal', marker='^', color='green', alpha=1)
    plt.scatter(sell_signals.index, sell_signals['Close'], label='Sell Signal', marker='v', color='red', alpha=1)

    plt.title('Technical Analysis Visualization')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()
    plt.show()

# Main program
if __name__ == '__main__':
    # Load the data
    data = pd.read_csv('data.csv', parse_dates=['Date'])
    data.set_index('Date', inplace=True)

    # Calculate indicators and signals
    data = calculate_indicators(data)
    data = generate_signals(data)

    # Visualize the results
    visualize(data)

    # Start Flask server
    app.run(debug=True)
