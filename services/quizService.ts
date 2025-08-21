import type { Quiz } from '../types';

const ML_QUIZ_DATA: Quiz = {
    "course": "Machine Learning Specialization by Andrew Ng",
    "weeks": [
        {
            "week": 1,
            "questions": [
                {
                    "id": "w1-q1",
                    "question": "Which of the following best describes supervised learning?",
                    "choices": [
                        "A) Learning patterns without labeled outputs",
                        "B) Learning from labeled input–output pairs to predict outputs for new inputs",
                        "C) Learning via reward signals from the environment",
                        "D) Learning by clustering similar data points"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "Right—supervised learning fits a mapping from x to y using labeled data.",
                        "incorrect": "Supervised learning uses labeled input–output pairs to learn a predictive mapping."
                    },
                    "difficulty": "easy",
                    "tags": ["supervised-learning"]
                },
                {
                    "id": "w1-q2",
                    "question": "In univariate linear regression, the hypothesis hθ(x)=θ0+θ1x. What does θ1 represent?",
                    "choices": [
                        "A) Intercept term",
                        "B) Slope measuring change in y per unit change in x",
                        "C) Learning rate",
                        "D) Regularization strength"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "θ1 is the slope.",
                        "incorrect": "θ1 is the slope—the change in prediction per unit x."
                    },
                    "difficulty": "easy",
                    "tags": ["linear-regression"]
                },
                {
                    "id": "w1-q3",
                    "question": "Which loss is minimized in ordinary least squares?",
                    "choices": [
                        "A) Mean absolute error",
                        "B) Mean squared error",
                        "C) Hinge loss",
                        "D) Cross-entropy"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "OLS minimizes MSE.",
                        "incorrect": "OLS uses squared errors, averaged over the data."
                    },
                    "difficulty": "easy",
                    "tags": ["linear-regression", "model-evaluation"]
                }
            ]
        },
        {
            "week": 2,
            "questions": [
                {
                    "id": "w2-q1",
                    "question": "The main purpose of feature scaling (e.g., standardization) for gradient descent is to:",
                    "choices": [
                        "A) Reduce training set size",
                        "B) Prevent overfitting by penalizing large weights",
                        "C) Make contours more spherical to speed up convergence",
                        "D) Improve test accuracy regardless of optimization"
                    ],
                    "answer": "C",
                    "explanations": {
                        "correct": "With similar feature scales, gradient descent takes more direct steps.",
                        "incorrect": "Scaling stabilizes and speeds up optimization by improving contour geometry."
                    },
                    "difficulty": "medium",
                    "tags": ["gradient-descent", "feature-scaling"]
                },
                {
                    "id": "w2-q2",
                    "question": "If gradient descent “oscillates” and fails to converge, which change is most appropriate first?",
                    "choices": [
                        "A) Increase learning rate α",
                        "B) Decrease learning rate α",
                        "C) Add more polynomial features",
                        "D) Remove the bias term"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "A smaller α can reduce divergence/oscillation.",
                        "incorrect": "Try reducing α—too large a step can overshoot."
                    },
                    "difficulty": "medium",
                    "tags": ["gradient-descent"]
                },
                {
                    "id": "w2-q3",
                    "question": "Adding polynomial features x, x², x³ to a linear model primarily:",
                    "choices": [
                        "A) Makes the hypothesis nonlinear in parameters",
                        "B) Makes the hypothesis nonlinear in inputs but linear in parameters",
                        "C) Is equivalent to k-means",
                        "D) Forces weights to be zero"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "The model stays linear in θ but nonlinear in x via feature mapping.",
                        "incorrect": "Polynomial expansion changes inputs, not linearity in parameters."
                    },
                    "difficulty": "medium",
                    "tags": ["polynomial-features", "linear-regression"]
                }
            ]
        },
        {
            "week": 3,
            "questions": [
                {
                    "id": "w3-q1",
                    "question": "L2 regularization (ridge) mainly helps by:",
                    "choices": [
                        "A) Increasing model variance",
                        "B) Shrinking parameters to reduce overfitting",
                        "C) Eliminating features from the model",
                        "D) Guaranteeing zero training error"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "Penalizing large weights reduces variance/overfitting.",
                        "incorrect": "Ridge shrinks parameters, improving generalization."
                    },
                    "difficulty": "medium",
                    "tags": ["regularization"]
                },
                {
                    "id": "w3-q2",
                    "question": "A model has high training error and high cross-validation error. This indicates:",
                    "choices": [
                        "A) High bias",
                        "B) High variance",
                        "C) Data leakage",
                        "D) Perfect fit"
                    ],
                    "answer": "A",
                    "explanations": {
                        "correct": "Underfitting is typical of high bias.",
                        "incorrect": "Both train and CV errors are high → underfit/high bias."
                    },
                    "difficulty": "hard",
                    "tags": ["bias-variance", "model-evaluation"]
                },
                {
                    "id": "w3-q3",
                    "question": "A common split for developing ML models is:",
                    "choices": [
                        "A) 100% training",
                        "B) 50% training, 50% test",
                        "C) Train/validation/test to tune hyperparameters then report test once",
                        "D) Validation only"
                    ],
                    "answer": "C",
                    "explanations": {
                        "correct": "Tune on validation; hold test for final unbiased estimate.",
                        "incorrect": "The standard pipeline uses held-out validation and a separate test set."
                    },
                    "difficulty": "hard",
                    "tags": ["data-splitting", "model-evaluation"]
                },
                {
                    "id": "w3-q4",
                    "question": "When increasing the regularization parameter λ in ridge regression, typically:",
                    "choices": [
                        "A) Training error decreases and test error decreases always",
                        "B) Training error increases; test error may decrease then increase",
                        "C) Training error decreases; test error increases",
                        "D) Both errors remain unchanged"
                    ],
                    "answer": "B",
                    "explanations": {
                        "correct": "More regularization raises bias; generalization may improve up to a point.",
                        "incorrect": "λ trades bias/variance; moderate values can reduce test error before hurting it."
                    },
                    "difficulty": "hard",
                    "tags": ["regularization", "bias-variance"]
                }
            ]
        }
    ]
};

/**
 * Fetches the quiz data for a given course ID.
 * In a real app, this would be a network request. Here, it's a mock.
 * @param courseId The playlistId of the course.
 * @returns A promise that resolves to the Quiz data or null if not found.
 */
export const fetchQuizByCourseId = async (courseId: string): Promise<Quiz | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Only the ML course has a quiz in this mock setup
    if (courseId === 'ML-Andrew-Ng') {
        return ML_QUIZ_DATA;
    }

    return null; // No quiz for other courses
};
