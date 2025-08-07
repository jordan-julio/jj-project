This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Call API
```jsx
useEffect(() => {
    // This effect runs once when the component mounts
    console.log("Home component mounted");
    axios.get("http://localhost:8000/api/health").then((response) => {
      console.log("Health check response:", response.data);
    });
    axios.get("http://localhost:8000/").then((response) => {
      console.log("Users response:", response.data);
    });
}, []);
```

## USER ROLES
'freelancer' | 'client' stored in raw_user_meta_data
Freelancers: User who accepts projects/tasks from clients
Clients: User who creates the projects/tasks for freelancers.

### Database Tables
1. Users table (can create later for now depend on one-time login using supabase auth)
2. Projects table 
id UUID (PK)
title TEXT
description TEXT
budget_min NUMERIC
budget_max NUMERIC
client_id UUID (FK to users)
category TEXT
status TEXT -- 'open', 'in_progress', 'completed', 'cancelled'
created_at TIMESTAMP

3. project_applications
id UUID (PK)
freelancer_id UUID (FK to users)
project_id UUID (FK to projects)
cover_letter TEXT
status TEXT -- 'pending', 'accepted', 'rejected', 'withdrawn'
submitted_at TIMESTAMP

4. contracts
id UUID (PK)
project_id UUID (FK to projects)
freelancer_id UUID (FK to users)
client_id UUID (FK to users)
status TEXT -- 'active', 'completed', 'disputed'
agreed_price NUMERIC
start_date TIMESTAMP
end_date TIMESTAMP

5. milestones
id UUID (PK)
contract_id UUID (FK to contracts)
title TEXT
description TEXT
amount NUMERIC
status TEXT -- 'pending', 'in_review', 'released', 'disputed'
due_date TIMESTAMP

6. escrow payments
id UUID (PK)
contract_id UUID
milestone_id UUID (nullable)
status TEXT -- 'funded', 'released', 'refunded'
amount NUMERIC
payment_provider TEXT -- 'xendit' | 'midtrans'
payment_id TEXT -- external payment ref
created_at TIMESTAMP

7. reviews
id UUID (PK)
contract_id UUID
reviewer_id UUID
reviewee_id UUID
rating INTEGER -- 1–5
comment TEXT
created_at TIMESTAMP

8. categories (Organize projects and freelancer skills. Used for filters/search.)
id UUID (PK)
name TEXT
description TEXT

## Add Chat System (not high priority)
Use Liveblocks Chat or Pusher Channels
Store only lightweight summaries in Supabase
Optional: Store full chat in object storage (JSON blobs) if needed later

## High Priority Features
1. Users can login
2. Clients can post projects/tasks
3. Freelancers can offer to take them
4. Payment is decided initially, money paid by client but on hold
5. If both party agrees, then project is now taken by the freelancer, freelancer stopped being able to take more projects.
6. Add Progress and levels completed on project/tasks. Once finish and both parties are satisfied, payment goes through.
7. Posting a job take 2.5%-5% OR fixed amount depends
8. Taking a job take 2.5%-5% once payment goes through OR fixed amount taken