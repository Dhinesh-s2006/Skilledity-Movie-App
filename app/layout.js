import './globals.css';

export const metadata = {
  title: 'Movies App',
  description: 'A NextJS app for browsing movies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}