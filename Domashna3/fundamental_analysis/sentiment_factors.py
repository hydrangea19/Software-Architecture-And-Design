import os
import re
from textblob import TextBlob


def clean_text(text):
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text



def load_news(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        news_data = f.read().split("\n\n")
    return news_data


def extract_description_and_shares(news_item):
    lines = news_item.split("\n")
    description_start = False
    description = ""
    number_of_shares = 0
    for line in lines:
        if line.startswith("Опис:"):
            description_start = True
            description = line[5:].strip()
        elif description_start:
            description += " " + line.strip()


        if 'обични акции' in line:
            matches = re.findall(r'\d+', line)
            if matches:
                number_of_shares += int(matches[0])

    return description, number_of_shares


def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity
    return sentiment



def generate_recommendation(sentiment, description, number_of_shares):

    positive_keywords = ["откуп", "позитивен", "раст", "добивка", "сопствени акции", "поволни", "зголемување"]
    negative_keywords = ["падна", "проблем", "негативен", "пад", "губиток", "лоши", "криза", "поради"]


    if any(keyword in description for keyword in positive_keywords):
        return "BUY"
    elif any(keyword in description for keyword in negative_keywords):
        return "SELL"


    if sentiment > 0.2 or number_of_shares > 100:
        return "BUY"
    elif sentiment < -0.2 or number_of_shares < 100:
        return "SELL"
    else:
        return "HOLD"


def main():
    news_data = load_news('news.txt')
    descriptions_and_shares = [extract_description_and_shares(news_item) for news_item in news_data]
    cleaned_descriptions = [clean_text(description) for description, _ in descriptions_and_shares]
    number_of_shares = [shares for _, shares in descriptions_and_shares]
    sentiments = [analyze_sentiment(description) for description in cleaned_descriptions]

    recommendations = [
        generate_recommendation(sentiment, description, shares)
        for sentiment, description, shares in zip(sentiments, cleaned_descriptions, number_of_shares)
    ]


    positive_recommendations = recommendations.count("BUY")
    negative_recommendations = recommendations.count("SELL")
    neutral_recommendations = recommendations.count("HOLD")


    positive_texts = [description for description, sentiment in zip(cleaned_descriptions, sentiments) if sentiment > 0]
    negative_texts = [description for description, sentiment in zip(cleaned_descriptions, sentiments) if sentiment < 0]


    with open('sentiment_analysis_results.txt', 'w', encoding='utf-8') as f:
        f.write(f"Positive news and reports: {positive_recommendations}\n")
        f.write(f"Negative news and reports: {negative_recommendations}\n")
        f.write(f"Neutral recommendations: {neutral_recommendations}\n")
        f.write("\nExample of Positive Text:\n")
        f.write(f"{positive_texts[:1]}\n")
        f.write("\nExample of Negative Text:\n")
        f.write(f"{negative_texts[:1]}\n")
        f.write("\nRecommendations:\n")
        for recommendation in recommendations:
            f.write(f"{recommendation}\n")

    print("Sentiment analysis results saved to sentiment_analysis_results.txt")


if __name__ == '__main__':
    main()
