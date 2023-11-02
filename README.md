## Next.js Project with Advanced Integrations

This project is built on [Next.js](https://nextjs.org/), kickstarted using create-next-app.

The project is live and running on Vercel at [https://hanko-hackathon.vercel.app](https://hanko-hackathon.vercel.app/)

Take a peek at the [bottom](#video) of this page for a brief video showcasing the project in action!

## Technologies

- [NextJS](https://nextjs.org/) the React Framework for the Web
- [Hanko](https://www.hanko.io/) the open source authentication
- [Replicate](https://replicate.com/) AI generate
- [Supabase](https://supabase.com/) database and real time database
- [Resend](https://resend.com/) email for developers
- [Tailwind](https://tailwindcss.com/) as CSS framework

## Getting Started

Running this project locally requires a bit of setup, especially when it comes to environment variables. Let's walk through it:

### Setup Environment Variables

Copy the example `.env.sample` file to a new file named `.env.local`. Then, replace the placeholders with your actual values.

You'll require the following environment variables:

- **Supabase**: Check out the documentation on how to obtain your keys: [Supabase Documentation](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=sql#get-the-api-keys)
  
- **Hanko API URL**: You can find the API URL in the Hanko console. Once retrieved, add it to your `.env` file.

- **Replicate API Token**: Visit the Replicate Console to obtain your API token: [Replicate Console](https://replicate.com/account/api-tokens)

- **Trigger.dev API**: Follow the official tutorial to find out how to get the API token from the Trigger panel: [Trigger.dev Tutorial](https://trigger.dev/docs/documentation/quickstarts/nextjs)

- **Resend API**: Acquire your API key from the Resend console: [Resend Console](https://resend.com/api-keys)

### Run Migrations

Once you've set up all the environment variables, proceed to run the migration with the command `npm run migrate-dev`. Provide a name (e.g., "init") for the purpose of creating tables in Supabase and setting up your triggers. Following this, head over to Supabase to verify the creation of the tables and function.

#### Database and tables

![Screenshot 2023-11-01 at 23 40 57](https://github.com/johanguse/hanko_hackathon/assets/6184866/319d1d79-9a6b-4d8a-ba37-911bf9710d3f)

#### Functions

![Screenshot 2023-11-01 at 23 41 23](https://github.com/johanguse/hanko_hackathon/assets/6184866/e0c4239b-8ebe-47df-a077-d01f957b52e8)

### Enable Database Realtime

To automatically update credits when a new AI Avatar is generated, set up the real-time feature in Supabase for the `credits` table. Ensure that real-time is activated for this table.
Here are the steps to do so: <https://supabase.com/docs/guides/realtime>

![Screenshot 2023-11-01 at 23 46 21](https://github.com/johanguse/hanko_hackathon/assets/6184866/5179e093-f93e-437a-89fe-34edb227cea0)

### Install Dependencies & Run

Once your environment variables are all set up:

Install dependencies

```bash
npm install
```

Start the development server

```
npm run dev
```

Now, head over to <http://localhost:3000> to see the project in action!

## Learn More

If you're interested in diving deeper into the technologies used in this project, here's a handy collection of resources to get you started:

### Next.js

[Next.js Documentation](https://nextjs.org/docs) - Everything you need to know about Next.js features and API.
[Learn Next.js](https://nextjs.org/learn) - An interactive tutorial to get hands-on with Next.js.

#### Hanko

[Hanko Documentation](https://docs.hanko.io/introduction) - Dive deeper into the world of open-source authentication with Hanko.

### Replicate

[Replicate Docs](https://replicate.com/docs) - Learn how to leverage AI generation with Replicate.

### Supabase

[Supabase Documentation](https://supabase.com/docs) - A comprehensive guide to understanding Supabase, your go-to for databases and real-time functionalities.

### Resend

[Resend Documentation](https://resend.com/docs/) - Explore the developer-friendly way of managing emails with Resend.

### TailwindCSS

[TailwindCSS Documentation](https://tailwindcss.com/docs/) - Get started with this utility-first CSS framework and make your web designs stand out.
Feel free to explore, experiment, and elevate your projects with the knowledge from these resources. Happy learning!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Video

<https://github.com/johanguse/hanko_hackathon/assets/6184866/c3b5b9bc-5db7-4630-9cc1-6079a8163468>
