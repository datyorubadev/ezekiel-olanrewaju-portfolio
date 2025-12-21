# Deployment Guide

Your project is a **Monorepo** containing two distinct applications:
1. **Frontend**: A React/Vite application (Root directory).
2. **Backend (CMS)**: A Payload/Next.js application (`cms` directory).

Vercel requires these to be deployed as **Two Separate Projects**.

## Part 1: Deploying the CMS (Backend)

1.  **Create New Project** in Vercel.
2.  Import the **same repository** (`ezekiel-olanrewaju-portfolio`).
3.  Name it something like `ezekiel-portfolio-cms`.
4.  **Important:** In "Configure Project" > **Root Directory**:
    *   Click `Edit`.
    *   Select the `cms` folder.
5.  **Environment Variables** (Add these in Vercel):
    *   `DATABASE_URI`: Your PostgreSQL connection string.
    *   `PAYLOAD_SECRET`: A random string (can be anything secure).
6.  **Deploy**.
7.  Copy the URL (e.g., `https://ezekiel-portfolio-cms.vercel.app`).

## Part 2: Deploying the Frontend

1.  Go to your **Frontend Project** in Vercel.
2.  **Environment Variables**:
    *   `VITE_PAYLOAD_URL`: Set this to your CMS URL + `/api` (e.g., `https://ezekiel-portfolio-cms.vercel.app/api`).
    *   *Remove* `DATABASE_URI` and `PAYLOAD_SECRET` from here (they are unsafe/unused on the frontend).
3.  **Redeploy** the latest commit.

## Troubleshooting

-   **CMS Builds Fail?** Check the Vercel Logs for the CMS project. Ensure `DATABASE_URI` is reachable from Vercel (use a cloud DB provider like Neon or Supabase).
-   **Frontend 404s?** Ensure `VITE_PAYLOAD_URL` ends with `/api`.
