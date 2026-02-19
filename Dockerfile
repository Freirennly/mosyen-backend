# 1. Pakai komputer server berukuran kecil yang sudah ada Node.js
FROM node:18-alpine

# 2. Buat folder bernama /app di dalam server
WORKDIR /app

# 3. Copy file daftar library (package.json)
COPY package*.json ./

# 4. Install semua library yang dibutuhkan
RUN npm install

# 5. Copy semua kodingan backend kamu ke dalam server
COPY . .

# 6. Terjemahkan TypeScript (.ts) menjadi JavaScript (.js)
RUN npm run build

# 7. Beri tahu server bahwa kita pakai port 3001
EXPOSE 3001

# 8. Nyalakan servernya!
CMD ["npm", "start"]