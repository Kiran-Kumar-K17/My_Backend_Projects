// src/utils/chatbot.js

const Chatbot = {
  defaultResponses: {
    "hello hi": "Hello! How can I help you?",
    "how are you": "I'm doing great! How can I help you?",
    thank: "No problem! Let me know if you need help with anything else!",

    "flip a coin": () => {
      return Math.random() < 0.5
        ? "Sure! You got heads"
        : "Sure! You got tails";
    },

    "roll a dice": () => {
      const dice = Math.floor(Math.random() * 6) + 1;
      return `Sure! You got ${dice}`;
    },

    "what is the date today": () => {
      const now = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `Today is ${months[now.getMonth()]} ${now.getDate()}`;
    },
  },

  additionalResponses: {},

  unsuccessfulResponse:
    "Sorry, I didn't quite understand that. Try asking for the date, flipping a coin, or rolling a dice.",

  emptyMessageResponse: "Your message is empty. Please type something 😊",

  addResponses(responses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...responses,
    };
  },

  getResponse(message) {
    if (!message) return this.emptyMessageResponse;

    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const keys = Object.keys(responses);
    const { bestMatchIndex, ratings } = this.stringSimilarity(
      message.toLowerCase(),
      keys
    );

    if (ratings[bestMatchIndex].rating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const response = responses[keys[bestMatchIndex]];
    return typeof response === "function" ? response() : response;
  },

  getResponseAsync(message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);
    });
  },

  compareTwoStrings(first, second) {
    first = first.replace(/\s+/g, "");
    second = second.replace(/\s+/g, "");

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    const bigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const gram = first.slice(i, i + 2);
      bigrams.set(gram, (bigrams.get(gram) || 0) + 1);
    }

    let intersection = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const gram = second.slice(i, i + 2);
      const count = bigrams.get(gram) || 0;
      if (count > 0) {
        bigrams.set(gram, count - 1);
        intersection++;
      }
    }

    return (2 * intersection) / (first.length + second.length - 2);
  },

  stringSimilarity(main, targets) {
    const ratings = targets.map((target) => ({
      target,
      rating: this.compareTwoStrings(main, target),
    }));

    let bestMatchIndex = 0;
    ratings.forEach((r, i) => {
      if (r.rating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    });

    return { ratings, bestMatchIndex };
  },
};

export default Chatbot;
