import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostData(fileName: string) {
   const fullPath = path.join(contentDirectory, fileName);
   try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
         metadata: data,
         content,
      };
   } catch (e) {
      console.error(`Error reading file ${fileName}`, e);
      return { metadata: {}, content: "Content not found." };
   }
}
