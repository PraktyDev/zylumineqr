// lib/db.ts
// Example: Mocking a database call. 
// In production, replace this with your ORM query (e.g., prisma.user.findUnique)

const users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    // Hashed password (bcrypt) for "password"
    // You can generate this using: await bcrypt.hash("password", 10)
    password: "$2a$10$cbV.DqXpGqjJj..." 
  }
]

export async function getUserFromDb(email: string) {
  // Simulate DB latency
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const user = users.find((u) => u.email === email)
  return user || null
}