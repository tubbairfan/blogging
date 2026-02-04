// "use client";

// interface CategoryFooterProps {
//   categories: any[];   
//   total: number;        
//   perPage: number;      
//   currentPage: number;  
// }

// export default function CategoryFooter({
//   categories,
//   total,
//   perPage,
//   currentPage,
// }: CategoryFooterProps) {
//   const start = (currentPage - 1) * perPage + 1;
//   const end = start + categories.length - 1;

//   return (
//     <div className="mt-auto py-3 px-4 border-t text-sm text-gray-600 bg-white">
//       Showing {start}-{end} of {total} Categories
//     </div>
//   );
// }

"use client";

export default function Footer() {
  return (
    <footer className=" px-5  text-sm">
      Showing 1-5 of 32 Categories
    </footer>
  );
}

