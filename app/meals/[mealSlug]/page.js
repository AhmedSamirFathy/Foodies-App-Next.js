import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import classes from './page.module.css';

export default function MealDetailsPage({ params }) {

  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={meal.image} alt={meal.title} fill />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto:${meal.creator_email}`}> {meal.creator}</a>
        </p>
        <p className={classes.summary}>{meal.summary}</p>
      </div>
    </header>
    <main>
      <p className={classes.instructions} dangerouslySetInnerHTML={{
        __html: meal.instructions
      }}></p>
    </main>
  </>
}

export async function getStaticPaths() {
  // Fetch all meal slugs from your data source
  const mealSlugs = getAllMealSlugs(); // Implement this function to get all meal slugs

  // Map meal slugs to the params object required by Next.js
  const paths = mealSlugs.map((slug) => ({
    params: { mealSlug: slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch meal data based on the meal slug
  const meal = getMeal(params.mealSlug); // Implement this function to get meal data based on slug

  return {
    props: {
      meal,
    },
  };
}
