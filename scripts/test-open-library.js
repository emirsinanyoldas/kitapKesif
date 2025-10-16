/**
 * Test Open Library API Integration
 * 
 * This script tests the Open Library API connection
 * and displays sample book data
 */

async function testOpenLibraryAPI() {
  console.log('🧪 Testing Open Library API integration...\n');

  try {
    // Test 1: Search for books
    console.log('📚 Test 1: Searching for fantasy books...');
    const response = await fetch('https://openlibrary.org/search.json?q=fantasy&limit=5');
    
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Success! Found ${data.numFound} books total`);
    console.log(`   Retrieved ${data.docs.length} books in this request\n`);

    // Test 2: Display first book
    if (data.docs.length > 0) {
      const book = data.docs[0];
      console.log('📖 Sample Book Data:');
      console.log('   Title:', book.title);
      console.log('   Author:', book.author_name?.[0] || 'Unknown');
      console.log('   Year:', book.first_publish_year || 'N/A');
      console.log('   ISBN:', book.isbn?.[0] || 'N/A');
      console.log('   Subjects:', book.subject?.slice(0, 3).join(', ') || 'N/A');
      
      // Test 3: Cover image URL
      if (book.isbn?.[0]) {
        const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
        console.log('   Cover URL:', coverUrl);
        console.log('\n🖼️  Test 3: Cover image URL generated successfully');
      } else if (book.cover_i) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        console.log('   Cover URL:', coverUrl);
        console.log('\n🖼️  Test 3: Cover image URL generated successfully');
      }
    }

    console.log('\n✅ All tests passed!');
    console.log('\n💡 Ready to import books! Run: npm run import-books');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('   Please check your internet connection and try again');
    process.exit(1);
  }
}

testOpenLibraryAPI();
