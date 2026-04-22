# Arun Kumar Nath — Portfolio

Cyberpunk-themed portfolio built with **Next.js 15**, **Three.js** (interactive 3D robot), and **MongoDB** for contact form storage.

## 🚀 Setup

### 1. Install
```bash
npm install
```

### 2. Configure MongoDB
Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```
Get a free cluster at https://www.mongodb.com/atlas

### 3. Run
```bash
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel
1. Push to GitHub
2. Import at vercel.com
3. Add `MONGODB_URI` in Environment Variables
4. Deploy ✅

## Structure
```
app/
  api/contact/route.ts  ← MongoDB contact API
  globals.css           ← Cyberpunk styles + animations
  page.tsx              ← Full portfolio page
components/
  RobotScene.tsx        ← Three.js interactive 3D robot
  Navbar.tsx            ← Responsive nav
  TypingText.tsx        ← Typing animation
  ContactForm.tsx       ← Form → MongoDB
lib/
  mongodb.ts            ← DB connection
  Contact.ts            ← Mongoose model
```

## Customize
- Update GitHub/live links in `projects` array in `page.tsx`
- Change accent colors in `--cyan`, `--purple`, `--green` CSS vars
- Add your own projects to the `projects` array
