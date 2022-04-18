import { useSettings } from '../src/hooks';
// _data
import {
  _testimonials,
  _jobsByCountries,
} from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { NewsletterCareer } from '../src/sections/newsletter';
import { BlogCareerLatestPosts } from '../src/sections/blog';
import { TestimonialsCareer } from '../src/sections/testimonials';

import {
  CareerLandingHero,
  CareerLandingStep,
  CareerLandingFeaturedJobs,
  CareerLandingTopCompanies,
  CareerLangdingConnections,
  CareerLandingHotCategories,
  CareerLangdingForRecruiters,
  CareerHomeSlider
} from '../src/sections/@career';
import useSWR from 'swr'
// ----------------------------------------------------------------------

// CareerLandingPage.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default function CareerLandingPage() {

  const {user, jobs: recruiterJobs} = useSettings()
  const {data: jobs= [], error} = useSWR('/jobs/all')
  const {data: posts= [], error: postError} = useSWR('/blogs')
  const {data: subscribed, error: subError} = useSWR('/subscribe', {revalidateOnFocus: true})


  return (
    <Page 
      title="Home Page -"
    >
      {/* <CareerLandingHero /> */}
      <CareerHomeSlider />

      {/* { !user || user?.accountType == 'applicant' && <CareerLandingStep />} */}

      {jobs && jobs.length > 0 && <CareerLandingFeaturedJobs jobs={jobs.slice(0, 5) || []} />}

      {/* <CareerLandingTopCompanies companies={_jobsByCompanies} /> */}

      <CareerLandingHotCategories />

      <CareerLangdingConnections countries={_jobsByCountries} />
      {
        !user || user.accountType == 'recruiter' && <CareerLangdingForRecruiters />
      }

      <TestimonialsCareer />

      { posts && posts.length > 0 && <BlogCareerLatestPosts posts={posts.slice(0, 5)} /> }

      {subscribed == null && <NewsletterCareer />}
    </Page>
  );
}

// ----------------------------------------------------------------------

CareerLandingPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

