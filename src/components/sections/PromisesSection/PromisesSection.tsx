import React from 'react';
import { motion } from 'framer-motion';

const PromisesSection = () => {
  const promises = [
    {
      id: 1,
      title: "Better Communication",
      content: "I promise to communicate better during disagreements, choosing understanding over anger."
    },
    {
      id: 2,
      title: "Emotional Awareness",
      content: "I will be more mindful of your feelings and express my love more clearly every day."
    },
    {
      id: 3,
      title: "Trust Building",
      content: "I commit to proving every day, through my actions and decisions, that your trust in me is the most precious gift I have."
    },
    {
      id: 4,
      title: "Patience",
      content: "I promise to be more patient and think before reacting during difficult moments."
    },
    {
      id: 5,
      title: "Active Listening",
      content: "I will listen more carefully to your concerns and validate your feelings."
    },
    {
      id: 6,
      title: "Quality Time",
      content: "I promise to prioritize our time together and make you feel special every day."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-800 text-center mb-12">
          My Promises to You
        </h2>

        {/* Mensaje de disculpa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <p className="text-xl text-purple-800 italic">
              I truly apologize for not acting appropriately during our fights. I'm sorry for not making you feel loved and for putting your trust at risk.
            </p>
          </div>
        </motion.div>

        {/* Lista de promesas */}
        <div className="space-y-6">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md transform hover:scale-102 transition-transform"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {promise.title}
              </h3>
              <p className="text-purple-600">
                {promise.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromisesSection;