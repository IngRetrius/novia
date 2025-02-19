import React from 'react';
import { motion } from 'framer-motion';

// List of reasons
const reasons = [
  { id: 1, title: "You are my best friend" },
  { id: 2, title: "Your smile brightens my day" },
  { id: 3, title: "You are incredibly strong" },
  { id: 4, title: "You make me feel special" },
  { id: 5, title: "Every moment with you is unique" },
  { id: 6, title: "Your cartoon character socks" },
  { id: 7, title: "Your love for flowers" },
  { id: 8, title: 'Your "why not" attitude for any plan' },
  { id: 9, title: "I loved your ability to get drunk with one beer" },
  { id: 10, title: "I love your ability now to handle the whole bottle" },
  { id: 11, title: "Your soft hands" },
  { id: 12, title: "Your intensity" },
  { id: 13, title: "Your dreams" },
  { id: 14, title: "Your dark hair" },
  { id: 15, title: "Your blonde hair" },
  { id: 16, title: "Your hair, short or long" },
  { id: 17, title: "Your sudden look changes" },
  { id: 18, title: "Your presence" },
  { id: 19, title: "The way you face situations" },
  { id: 20, title: "Your smile" },
  { id: 21, title: "Your love for the stars and the universe" },
  { id: 22, title: "Your taste for lavender" },
  { id: 23, title: "Your simplicity" },
  { id: 24, title: "Your nose" },
  { id: 25, title: "Your eyes" },
  { id: 26, title: "I love that you love my insecurities" },
  { id: 27, title: "I love when you hug me" },
  { id: 28, title: "I love feeling your lips" },
  { id: 29, title: "I love how excited you get when you see me" },
  { id: 30, title: "I love your smile" },
  { id: 31, title: "Your advice" },
  { id: 32, title: "Your life anecdotes" },
  { id: 33, title: "Your words" },
  { id: 34, title: "Your jealousy" },
  { id: 35, title: "Because you are my Bloom" },
  { id: 36, title: "Your voice" },
  { id: 37, title: "Your intelligence" },
  { id: 38, title: "Your sense of humor" },
  { id: 39, title: "The way you make me a better person" },
  { id: 40, title: "Your patience" },
  { id: 41, title: "Your ass :)" },
  { id: 42, title: "The way you believe in God" },
  { id: 43, title: "Your kindness" },
  { id: 44, title: "Your worries" },
  { id: 45, title: "The way you take care of your brother" },
  { id: 46, title: "Your maturity" },
  { id: 47, title: "Your compassion" },
  { id: 48, title: "Your beauty marks all over your body" },
  { id: 49, title: "That small red dot next to your eye" },
  { id: 50, title: "The way you dance" },
  { id: 51, title: "The way you ski" },
  { id: 52, title: "Your Turkish accent" },
  { id: 53, title: "The way you can handle 100 things at once" },
  { id: 54, title: "The chai you make" },
  { id: 55, title: "Your Turkish yogurt oatmeal" },
  { id: 56, title: "The way you appreciate art" },
  { id: 57, title: "I love your art" },
  { id: 58, title: "Your drawings and illustrations" },
  { id: 59, title: "Your coffee" },
  { id: 60, title: "The way you support my projects and ideas" },
  { id: 61, title: "Your style" },
  { id: 62, title: "I love the way you work as a bartender" },
  { id: 63, title: "I love how you drive" },
  { id: 64, title: "I loved your tomato shots idea" },
  { id: 65, title: "Your glasses" },
  { id: 66, title: "Your braids" },
  { id: 67, title: "Your gifts" },
  { id: 68, title: "Starbucks and private university:)" },
  { id: 69, title: "Dancing queen" },
  { id: 70, title: "Vega & Summer" },
];

export default function ReasonsSection() {
    return (
      <div id="reasons" className="py-20 bg-gradient-to-b from-purple-50 to-purple-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title">Reasons why I love you</h2>
          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 bg-white/90 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-purple-800">
                  {reason.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  