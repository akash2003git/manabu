const courses = [
  {
    title: "Introduction to Web Development",
    description:
      "A complete beginner's guide to HTML, CSS, and JavaScript. Learn to build your first website from scratch.",
    price: 49.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503660/intro_to_webdev_isqw1b.png",
    published: true,
    content: [
      {
        title: "HTML Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        description: "Learn the basic structure and tags of HTML5.",
      },
      {
        title: "CSS Styling and Layouts",
        videoUrl: "https://www.youtube.com/watch?v=h-rP2f-gA58",
        description:
          "Explore selectors, properties, and modern layout techniques like Flexbox and Grid.",
      },
    ],
  },
  {
    title: "React for Beginners",
    description:
      "Master the fundamentals of React, from components and state to hooks and routing.",
    price: 79.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/react_gcnjpd.png",
    published: true,
    featured: true,
    content: [
      {
        title: "Setting up a React Project",
        videoUrl: "https://www.youtube.com/watch?v=JgT1mX77F5o",
        description: "How to use create-react-app and other tools.",
      },
      {
        title: "Understanding State and Props",
        videoUrl: "https://www.youtube.com/watch?v=sB1-f-I-F-s",
        description: "The two core concepts of data flow in React.",
      },
    ],
  },
  {
    title: "Node.js and Express: The Backend Masterclass",
    description:
      "Build robust and scalable REST APIs using Node.js and the Express framework.",
    price: 99.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503657/node_gwsiy5.png",
    published: true,
    featured: true,
    content: [
      {
        title: "Introduction to Node.js",
        videoUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
        description:
          "Understanding the event loop and asynchronous nature of Node.",
      },
      {
        title: "Building your first Express Server",
        videoUrl: "https://www.youtube.com/watch?v=pnhO-K68r7E",
        description: "Setting up routes, middleware, and handling requests.",
      },
    ],
  },
  {
    title: "Advanced CSS & Animations",
    description:
      "Dive deep into modern CSS features, including Sass, CSS Grid, and sophisticated animations.",
    price: 65.0,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/css_hhw4k6.png",
    published: true,
    content: [
      {
        title: "Flexbox and CSS Grid",
        videoUrl: "https://www.youtube.com/watch?v=h-rP2f-gA58",
        description: "Mastering modern layout techniques.",
      },
      {
        title: "Keyframe Animations and Transitions",
        videoUrl: "https://www.youtube.com/watch?v=S-t14vV901Y",
        description: "Create stunning visual effects with CSS.",
      },
    ],
  },
  {
    title: "Data Structures & Algorithms in Python",
    description:
      "Improve your problem-solving skills and prepare for technical interviews.",
    price: 89.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/dsa_py_ejkmrb.png",
    published: true,
    featured: true,
    content: [
      {
        title: "Arrays and Linked Lists",
        videoUrl: "https://www.youtube.com/watch?v=W0FpT1R-d8M",
        description: "Understanding fundamental data structures.",
      },
      {
        title: "Sorting Algorithms",
        videoUrl: "https://www.youtube.com/watch?v=S0y62y_sVdM",
        description: "Implement and analyze different sorting algorithms.",
      },
    ],
  },
  {
    title: "Introduction to Machine Learning",
    description:
      "Learn the core concepts of machine learning with hands-on Python projects.",
    price: 129.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503661/ml_f2hml9.png",
    published: true,
    featured: true,
    content: [
      {
        title: "What is Machine Learning?",
        videoUrl: "https://www.youtube.com/watch?v=k_L6fT0-w2I",
        description:
          "An overview of supervised, unsupervised, and reinforcement learning.",
      },
      {
        title: "Regression and Classification",
        videoUrl: "https://www.youtube.com/watch?v=A3nSgR0z3oQ",
        description: "Implement your first models using scikit-learn.",
      },
    ],
  },
  {
    title: "Full-Stack E-commerce with MERN",
    description:
      "Build a complete e-commerce application using MongoDB, Express, React, and Node.js.",
    price: 149.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503661/e_comm_tcxt91.png",
    published: true,
    content: [
      {
        title: "Setting up the Backend",
        videoUrl: "https://www.youtube.com/watch?v=TzI14R_4-iU",
        description: "Creating the API and database schema.",
      },
      {
        title: "Building the Frontend",
        videoUrl: "https://www.youtube.com/watch?v=XhI56z42sQ4",
        description: "Developing the user interface with React.",
      },
    ],
  },
  {
    title: "Docker for Developers",
    description:
      "Learn how to containerize your applications for easy deployment and scalability.",
    price: 69.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503656/docker_wp62rl.png",
    published: true,
    content: [
      {
        title: "Introduction to Docker",
        videoUrl: "https://www.youtube.com/watch?v=Yf1e941C47g",
        description: "Understanding containers, images, and Dockerfiles.",
      },
    ],
  },
  {
    title: "Python for Data Science",
    description:
      "A practical guide to using Python libraries like Pandas, NumPy, and Matplotlib for data analysis.",
    price: 109.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503656/data_science_py_fx8llu.png",
    published: true,
    content: [
      {
        title: "Working with Pandas",
        videoUrl: "https://www.youtube.com/watch?v=C_Dq3h4jV_4",
        description: "Cleaning and manipulating data with DataFrames.",
      },
      {
        title: "Data Visualization with Matplotlib",
        videoUrl: "https://www.youtube.com/watch?v=n-P_V9-Hh8U",
        description: "Creating beautiful and informative plots.",
      },
    ],
  },
  {
    title: "Getting Started with GraphQL",
    description:
      "Build powerful and flexible APIs using GraphQL, with a focus on Apollo Server and Client.",
    price: 89.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503660/graphql_kzzjvn.png",
    published: true,
    content: [
      {
        title: "GraphQL vs. REST",
        videoUrl: "https://www.youtube.com/watch?v=7uK-0kL9P8k",
        description: "Understanding the key differences and when to use each.",
      },
    ],
  },
  {
    title: "The Art of Writing Clean Code",
    description:
      "Master best practices for writing readable, maintainable, and scalable code.",
    price: 59.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503658/clean_code_kxzwcy.png",
    published: true,
    content: [
      {
        title: "Naming Conventions",
        videoUrl: "https://www.youtube.com/watch?v=rU0pE7f3p20",
        description: "The importance of clear and descriptive names.",
      },
    ],
  },
  {
    title: "AWS Fundamentals",
    description:
      "A hands-on introduction to essential Amazon Web Services for deploying and managing applications.",
    price: 119.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503660/aws_uq55hp.png",
    published: true,
    featured: true,
    content: [
      {
        title: "EC2 and S3 Basics",
        videoUrl: "https://www.youtube.com/watch?v=k_YQ3p8yN0Q",
        description: "Setting up virtual machines and object storage.",
      },
      {
        title: "Using Lambda Functions",
        videoUrl: "https://www.youtube.com/watch?v=p4vI9bH4-tI",
        description: "Building serverless applications.",
      },
    ],
  },
  {
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile apps for iOS and Android using a single codebase.",
    price: 139.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/react_native_ktldqu.png",
    published: true,
    content: [
      {
        title: "React Native Basics",
        videoUrl: "https://www.youtube.com/watch?v=f9d6M28_9b4",
        description: "Introduction to components, styling, and navigation.",
      },
      {
        title: "State Management with Redux",
        videoUrl: "https://www.youtube.com/watch?v=f9d6M28_9b4",
        description: "Managing complex application state.",
      },
    ],
  },
  {
    title: "SQL for Beginners",
    description:
      "Master the fundamentals of SQL for managing and querying relational databases.",
    price: 75.0,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/sql_occsow.png",
    published: true,
    content: [
      {
        title: "Introduction to Relational Databases",
        videoUrl: "https://www.youtube.com/watch?v=qj6r_Jm9qJg",
        description: "Understanding tables, keys, and relationships.",
      },
      {
        title: "Essential SQL Commands",
        videoUrl: "https://www.youtube.com/watch?v=2SgYw3G1o_w",
        description: "Learning SELECT, INSERT, UPDATE, and DELETE statements.",
      },
    ],
  },
  {
    title: "Cybersecurity Fundamentals",
    description:
      "An introduction to the principles of cybersecurity, from network security to ethical hacking.",
    price: 159.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503657/cyber_security_fundamentals_co4kpp.png",
    published: true,
    featured: true,
    content: [
      {
        title: "Network Security Basics",
        videoUrl: "https://www.youtube.com/watch?v=8Vz9N3H0k6Q",
        description: "Firewalls, encryption, and secure protocols.",
      },
      {
        title: "Ethical Hacking and Penetration Testing",
        videoUrl: "https://www.youtube.com/watch?v=8hX-cKz-c4E",
        description:
          "A responsible approach to finding and fixing vulnerabilities.",
      },
    ],
  },
  {
    title: "Cloud Computing with Azure",
    description:
      "Learn to deploy and manage applications on the Microsoft Azure cloud platform.",
    price: 125.0,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503659/azure_ofdibd.png",
    published: true,
    content: [
      {
        title: "Introduction to Azure",
        videoUrl: "https://www.youtube.com/watch?v=Nn1R4_1B_7U",
        description: "Overview of Azure services and infrastructure.",
      },
      {
        title: "Deploying Web Apps",
        videoUrl: "https://www.youtube.com/watch?v=J_jKjB7gJ-k",
        description: "Using Azure App Service for web deployments.",
      },
    ],
  },
  {
    title: "Advanced Python for Backend Development",
    description:
      "Go beyond the basics with Django and Flask to build powerful web applications.",
    price: 115.0,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503658/backend_py_ta5gwg.png",
    published: true,
    content: [
      {
        title: "Django Framework",
        videoUrl: "https://www.youtube.com/watch?v=F0m-yU2x1q0",
        description: "Building a full-featured web app with Django.",
      },
      {
        title: "REST APIs with Django REST Framework",
        videoUrl: "https://www.youtube.com/watch?v=UqI7N5i61t4",
        description: "Creating robust APIs for your applications.",
      },
    ],
  },
  {
    title: "Introduction to UI/UX Design",
    description:
      "Learn the principles of creating user-friendly interfaces and engaging experiences.",
    price: 45.0,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/ui_ux_wsevo4.png",
    published: true,
    content: [
      {
        title: "The Human-Centered Design Process",
        videoUrl: "https://www.youtube.com/watch?v=FTQ6wGZ-v7s",
        description: "Putting the user at the center of the design process.",
      },
      {
        title: "Color Theory and Typography",
        videoUrl: "https://www.youtube.com/watch?v=5x0k1XW318A",
        description: "Using visual elements to create effective designs.",
      },
    ],
  },
  {
    title: "Blockchain Technology and Cryptocurrencies",
    description:
      "An introductory course to the world of decentralized technology and digital currencies.",
    price: 189.99,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503658/blockchain_gpjdnw.png",
    published: false,
    content: [
      {
        title: "How Blockchain Works",
        videoUrl: "https://www.youtube.com/watch?v=yubzJw0gO6Q",
        description:
          "Understanding the fundamental concepts of blocks and chains.",
      },
      {
        title: "Introduction to Smart Contracts",
        videoUrl: "https://www.youtube.com/watch?v=p4wG_I8g0hM",
        description: "Coding your first smart contract on Ethereum.",
      },
    ],
  },
  {
    title: "Game Development with Unity",
    description:
      "Create your own 2D and 3D games with the popular Unity game engine.",
    price: 135.0,
    imageLink:
      "https://res.cloudinary.com/dqpl3oz88/image/upload/v1754503654/unity_relt6l.png",
    published: true,
    content: [
      {
        title: "Unity Editor and C# Basics",
        videoUrl: "https://www.youtube.com/watch?v=k-V3yD6a4gI",
        description:
          "Getting familiar with the Unity interface and scripting with C#.",
      },
      {
        title: "Building a Simple 2D Game",
        videoUrl: "https://www.youtube.com/watch?v=5_d_e_f_g_h_i",
        description:
          "A step-by-step guide to creating a simple game from scratch.",
      },
    ],
  },
];

module.exports = courses;
