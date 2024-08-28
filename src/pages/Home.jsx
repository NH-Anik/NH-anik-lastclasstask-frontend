import Layout from "../component/Layout/Layout";

const Home = () => {
  const capabilities = [
    { action: "Create Admin", description: "Can create new admin accounts." },
    { action: "Create User", description: "Can create new user accounts." },
    { action: "Create Blog Post", description: "Can create new blog posts." },
    { action: "Delete", description: "Can delete blog posts, users, and potentially other resources." },
    { action: "Remove", description: "Can remove users or blog posts." },
    { action: "Update", description: "Can update existing blog posts or user details." },
    { action: "Edit", description: "Can edit blog posts or user information." },
    { action: "Demote Admin to User", description: "Can change an admin's role to a user role." }
  ];
  const cap = [
    { action: "Registration", description: "Can register a new account." },
    { action: "Login", description: "Can log into their account." },
    { action: "Forgot Password", description: "Can reset their password if forgotten." },
    { action: "View Blog", description: "Can view blog posts." }
  ];

    return (
        <Layout title={"Home - 500 TK"}>
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <h1 className=" text-3xl text-center font-bold">Blog Post Project</h1>
            <h2 className=" text-3xl text-center font-bold text-blue-600">Admin role 1 --- User role 0</h2>
            <div className="">
             
              <div className=""> 
                <h2 className="text-xl text-center my-6 text-green-500">Admin Role Capabilities</h2>
                <ul>
                  {capabilities.map((capability, index) => (
                    <li key={index}>
                      <strong>{capability.action}:</strong> {capability.description}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="">
                <h2 className="text-xl text-center my-6 text-green-500">User Role Capabilities</h2>
                <ul>
                  {cap.map((capability, index) => (
                    <li key={index}>
                      <strong>{capability.action}:</strong> {capability.description}
                    </li>
                  ))}
  
                </ul>
              </div>

            </div>
          </div>
        </Layout>
    );
};

export default Home;