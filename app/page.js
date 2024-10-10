"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("/api/users");
    setUsers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/users", { name, email });
    setName("");
    setEmail("");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">User Management</h1>

          <form onSubmit={handleSubmit} className="mb-8">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 mr-2" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mr-2" required />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add User
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-gray-100 p-4 rounded">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <button onClick={() => handleDelete(user.id)} className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <section className="bg-blue-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">About Our Project</h2>
            <p className="text-lg">Project ini dibuat dengan next js, node js dan Mysql sebagai manajemen database.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
