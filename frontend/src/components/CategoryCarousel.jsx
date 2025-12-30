import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
  //'Mobile App Developer',
  'Data Scientist',
  //'Machine Learning Engineer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Graphic Designer',
  'Project Manager',
  'QA Tester',
  'Product Manager',
  'Cloud Architect',
  //'Cybersecurity Analyst',
  //'Blockchain Developer',
  'AI Engineer',
  //'Database Administrator',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <section className="my-16 px-4 mx-10 md:mx-0 md:mr-20">
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="w-full rounded-full text-sm py-3"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
