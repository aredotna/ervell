import React, { Component } from 'react';
import DescriptiveCarousel from '../DescriptiveCarousel/index';

class HomeCarousel extends Component {
  render() {
    const slides = [
      {
        id: 'save-and-organize',
        headline: 'Save and organize anything',
        image: 'https://d2w9rnfcy7mm78.cloudfront.net/1586587/original_971cf68a81483a8c80a9f574a62ec24e.png',
        copy: 'Easily add any piece of content to Are.na from your phone, your browser, or your desktop. Everything lives in flexible collections called channels.',
      },
      {
        id: 'learn-from-links',
        headline: 'Learn from your links',
        image: 'https://d2w9rnfcy7mm78.cloudfront.net/1819604/original_ab9278398679a8b336190f220aea0649.png',
        copy: 'Save anything you see on Are.na to your channels. Explore related topics by following connections between channels',
      },
      {
        id: 'build-ideas-together',
        headline: 'Build ideas together',
        image: 'https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png',
        copy: 'Work on channels privately or collaborate with others. Either way, the entire Are.na community is your knowledge base.',
      },
    ];
    return (
      <DescriptiveCarousel slides={slides} />
    );
  }
}

export default HomeCarousel;
