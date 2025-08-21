import type { Course, Week, Lesson } from '../types';

// Mock data store for multiple playlists
const MOCK_DATA_STORE: { [key: string]: any[] } = {
  'ML-Andrew-Ng': [
    // Week 1
    { snippet: { title: "#1 Machine Learning Specialization [Course 1, Week 1, Lesson 1]", resourceId: { videoId: "vStJoetOxJg" } } },
    { snippet: { title: "#2 Machine Learning Specialization [Course 1, Week 1, Lesson 1]", resourceId: { videoId: "wiNXzydta4c" } } },
    { snippet: { title: "#3 Machine Learning Specialization [Course 1, Week 1, Lesson 2]", resourceId: { videoId: "XtlwSmJfUs4" } } },
    { snippet: { title: "#4 Machine Learning Specialization [Course 1, Week 1, Lesson 2]", resourceId: { videoId: "sca5rQ9x1cA" } } },
    { snippet: { title: "#5 Machine Learning Specialization [Course 1, Week 1, Lesson 2]", resourceId: { videoId: "hh6gE0LxfO8" } } },
    { snippet: { title: "#6 Machine Learning Specialization [Course 1, Week 1, Lesson 2]", resourceId: { videoId: "gG_wI_uGfIE" } } },
    { snippet: { title: "#7 Machine Learning Specialization [Course 1, Week 1, Lesson 2]", resourceId: { videoId: "_0bhZBqtCCs" } } },
    { snippet: { title: "#8 Machine Learning Specialization [Course 1, Week 1, Lesson 2]", resourceId: { videoId: "6dTL76DWYQU" } } },
    { snippet: { title: "#9 Machine Learning Specialization [Course 1, Week 1, Lesson 3]", resourceId: { videoId: "dLc-lfEEYss" } } },
    { snippet: { title: "#10 Machine Learning Specialization [Course 1, Week 1, Lesson 3]", resourceId: { videoId: "KWULpBYzIYk" } } },
    { snippet: { title: "#11 Machine Learning Specialization [Course 1, Week 1, Lesson 3]", resourceId: { videoId: "CFN5zHzEuGY" } } },
    { snippet: { title: "#12 Machine Learning Specialization [Course 1, Week 1, Lesson 3]", resourceId: { videoId: "peNRqkfukYY" } } },
    { snippet: { title: "#13 Machine Learning Specialization [Course 1, Week 1, Lesson 3]", resourceId: { videoId: "bFNz2u0hl9E" } } },
    { snippet: { title: "#14 Machine Learning Specialization [Course 1, Week 1, Lesson 3]", resourceId: { videoId: "L5INhX5cbWU" } } },
    { snippet: { title: "#15 Machine Learning Specialization [Course 1, Week 1, Lesson 4]", resourceId: { videoId: "WtlvKq_zxPI" } } },
    { snippet: { title: "#16 Machine Learning Specialization [Course 1, Week 1, Lesson 4]", resourceId: { videoId: "w_2vCijLiiM" } } },
    { snippet: { title: "#17 Machine Learning Specialization [Course 1, Week 1, Lesson 4]", resourceId: { videoId: "PKm61nrqpCA" } } },
    { snippet: { title: "#18 Machine Learning Specialization [Course 1, Week 1, Lesson 4]", resourceId: { videoId: "k0h8emRAAHE" } } },
    { snippet: { title: "#19 Machine Learning Specialization [Course 1, Week 1, Lesson 4]", resourceId: { videoId: "RGL_XUjPkGo" } } },
    { snippet: { title: "#20 Machine Learning Specialization [Course 1, Week 1, Lesson 4]", resourceId: { videoId: "tHDDbqYfflM" } } },
    // Week 2
    { snippet: { title: "#21 Machine Learning Specialization [Course 1, Week 2, Lesson 1]", resourceId: { videoId: "jXg0vU0y1ak" } } },
    { snippet: { title: "#22 Machine Learning Specialization [Course 1, Week 2, Lesson 1]", resourceId: { videoId: "U6zuBcmLxSg" } } },
    { snippet: { title: "#23 Machine Learning Specialization [Course 1, Week 2, Lesson 1]", resourceId: { videoId: "uvTL1N02f04" } } },
    { snippet: { title: "#24 Machine Learning Specialization [Course 1, Week 2, Lesson 1]", resourceId: { videoId: "YjpCQof9tI8" } } },
    { snippet: { title: "#25 Machine Learning Specialization [Course 1, Week 2, Lesson 2]", resourceId: { videoId: "YVtP5UGdgXg" } } },
    { snippet: { title: "#26 Machine Learning Specialization [Course 1, Week 2, Lesson 2]", resourceId: { videoId: "gmJqLGrUscg" } } },
    { snippet: { title: "#27 Machine Learning Specialization [Course 1, Week 2, Lesson 2]", resourceId: { videoId: "5g4H5_gsTpU" } } },
    { snippet: { title: "#28 Machine Learning Specialization [Course 1, Week 2, Lesson 2]", resourceId: { videoId: "P_9hNBVRldM" } } },
    { snippet: { title: "#29 Machine Learning Specialization [Course 1, Week 2, Lesson 2]", resourceId: { videoId: "ecOdZlY9jsQ" } } },
    { snippet: { title: "#30 Machine Learning Specialization [Course 1, Week 2, Lesson 2]", resourceId: { videoId: "IFkRKJ5iBDE" } } },
    // Week 3
    { snippet: { title: "#31 Machine Learning Specialization [Course 1, Week 3, Lesson 1]", resourceId: { videoId: "p-ltr1C7u2o" } } },
    { snippet: { title: "#32 Machine Learning Specialization [Course 1, Week 3, Lesson 1]", resourceId: { videoId: "xuTiAW0OR40" } } },
    { snippet: { title: "#33 Machine Learning Specialization [Course 1, Week 3, Lesson 1]", resourceId: { videoId: "0az8RjxLLPQ" } } },
    { snippet: { title: "#34 Machine Learning Specialization [Course 1, Week 3, Lesson 2]", resourceId: { videoId: "vq4Ie5xWhww" } } },
    { snippet: { title: "#35 Machine Learning Specialization [Course 1, Week 3, Lesson 2]", resourceId: { videoId: "YkTcK_LXAxw" } } },
    { snippet: { title: "#36 Machine Learning Specialization [Course 1, Week 3, Lesson 3]", resourceId: { videoId: "6SZUnXEHCns" } } },
    { snippet: { title: "#37 Machine Learning Specialization [Course 1, Week 3, Lesson 4]", resourceId: { videoId: "8upNQi-40Q8" } } },
    { snippet: { title: "#38 Machine Learning Specialization [Course 1, Week 3, Lesson 4]", resourceId: { videoId: "1kgcON0Eauc" } } },
    { snippet: { title: "#39 Machine Learning Specialization [Course 1, Week 3, Lesson 4]", resourceId: { videoId: "NIiZZY7nlfU" } } },
    { snippet: { title: "#40 Machine Learning Specialization [Course 1, Week 3, Lesson 4]", resourceId: { videoId: "jhrrw8Iuus0" } } },
    { snippet: { title: "#41 Machine Learning Specialization [Course 1, Week 3, Lesson 4]", resourceId: { videoId: "NhZXRzH2y-E" } } },
  ],
  'PLWKjhJtqVAbk-c8Qd5-0Z_PA_aXun0_hW': [ // React JS Full Course (freeCodeCamp)
    { snippet: { title: "React Course - Beginner's Tutorial for React JavaScript Library [2022]", resourceId: { videoId: "SqcY0GlETPk" } } },
    { snippet: { title: "React Props", resourceId: { videoId: "bMknfKXIFA8" } } },
    { snippet: { title: "React State - useState Hook", resourceId: { videoId: "hQAHd_02OaM" } } },
    { snippet: { title: "Conditional Rendering in React", resourceId: { videoId: "c_N9i_d_3jI" } } },
    { snippet: { title: "React useEffect Hook", resourceId: { videoId: "0ZJgIjIuY7U" } } },
    { snippet: { title: "React Router", resourceId: { videoId: "k2Zk5cbi6cs" } } },
  ],
};

// Define available courses
const AVAILABLE_COURSES = [
  {
    id: '1',
    playlistId: 'PLWKjhJtqVAbk-c8Qd5-0Z_PA_aXun0_hW',
    title: "React JS Full Course",
    description: "A beginner-friendly guide to the most popular front-end library, React JS.",
    thumbnailUrl: `https://img.youtube.com/vi/SqcY0GlETPk/sddefault.jpg`,
  },
  {
    id: '2',
    playlistId: 'ML-Andrew-Ng',
    title: "Machine Learning Specialization by Andrew Ng",
    description: "A foundational course on Machine Learning by Andrew Ng, covering key concepts, models, and practical applications.",
    thumbnailUrl: `https://img.youtube.com/vi/vStJoetOxJg/sddefault.jpg`,
  }
];

export const getAvailableCourses = async (): Promise<Omit<Course, 'weeks'>[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return AVAILABLE_COURSES;
}

const processVideosIntoCourse = (playlistId: string, items: any[]): Course => {
  const courseInfo = AVAILABLE_COURSES.find(c => c.playlistId === playlistId);
  if (!courseInfo) {
    throw new Error("Course not found for the given playlist ID.");
  }

  const createLesson = (item: any, weekId: string): Lesson => ({
    id: item.snippet.resourceId.videoId,
    week_id: weekId,
    title: item.snippet.title.trim(),
    video_id: item.snippet.resourceId.videoId,
  });
  
  // Custom week structure for the Machine Learning Course
  if (playlistId === 'ML-Andrew-Ng') {
    const weeks: Week[] = [
      { id: `${playlistId}-week-1`, course_id: playlistId, week_number: 1, title: "Week 1", lessons: items.slice(0, 20).map(item => createLesson(item, `${playlistId}-week-1`)) },
      { id: `${playlistId}-week-2`, course_id: playlistId, week_number: 2, title: "Week 2", lessons: items.slice(20, 30).map(item => createLesson(item, `${playlistId}-week-2`)) },
      { id: `${playlistId}-week-3`, course_id: playlistId, week_number: 3, title: "Week 3", lessons: items.slice(30, 41).map(item => createLesson(item, `${playlistId}-week-3`)) },
    ];
    return { ...courseInfo, weeks };
  }

  // Default structure for all other courses
  const weeks: Week[] = [];
  const lessonsPerWeek = 4;
  let currentWeek: Week | null = null;

  items.forEach((item, index) => {
    if (!item.snippet?.resourceId?.videoId) return;

    const weekNumber = Math.floor(index / lessonsPerWeek) + 1;

    if (!currentWeek || currentWeek.week_number !== weekNumber) {
      currentWeek = {
        id: `${playlistId}-week-${weekNumber}`,
        course_id: playlistId,
        week_number: weekNumber,
        title: `Week ${weekNumber}`,
        lessons: [],
      };
      weeks.push(currentWeek);
    }
    
    const videoId = item.snippet.resourceId.videoId;
    const lesson: Lesson = {
      id: videoId,
      week_id: currentWeek.id,
      title: item.snippet.title.trim(),
      video_id: videoId,
    };
    currentWeek.lessons.push(lesson);
  });

  return {
    ...courseInfo,
    weeks: weeks,
  };
};

export const fetchCourseByPlaylistId = async (playlistId: string): Promise<Course> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockItems = MOCK_DATA_STORE[playlistId];
  if (!mockItems) {
    throw new Error("Mock data not available for the specified playlist ID.");
  }

  return processVideosIntoCourse(playlistId, mockItems);
};
