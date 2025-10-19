# ✅ Quick Test Checklist - Manual Verification

## Before You Start
- [ ] Dev server running: `npm run dev`
- [ ] Browser open: http://localhost:5173
- [ ] Console open: Press F12

---

## 🔍 1. Search Functionality (2 min)

**Test Steps:**
1. [ ] Type "science" in search bar
2. [ ] Verify books filter immediately
3. [ ] Clear search
4. [ ] Verify all books show again

**Expected Result:** ✅ Instant filtering, no lag

---

## 🎛️ 2. Category Filter (2 min)

**Test Steps:**
1. [ ] Click filter button (🔽 icon)
2. [ ] Verify dropdown opens
3. [ ] Select "Science Fiction"
4. [ ] Verify:
   - [ ] Books filter to category
   - [ ] Blue dot appears on filter button
   - [ ] "Aktif Filtre" badge appears
   - [ ] Badge shows category name
5. [ ] Click X on badge
6. [ ] Verify filter clears

**Expected Result:** ✅ Visual feedback, proper filtering

---

## 📖 3. Book Modal (2 min)

**Test Steps:**
1. [ ] Click any book card
2. [ ] Verify modal opens
3. [ ] Check console for:
   ```
   BookModal - Book data: {...}
   BookModal - Reviews: [...]
   ```
4. [ ] Verify modal shows:
   - [ ] Book title
   - [ ] Author name
   - [ ] Description
   - [ ] Category badge
   - [ ] Rating (0.0 if in demo mode)
   - [ ] Review count
   - [ ] Cover image
5. [ ] Press ESC key
6. [ ] Verify modal closes

**Expected Result:** ✅ Modal opens, data displays, closes properly

---

## 📝 4. Footer Modals (3 min)

**Test Each Modal:**

### "Nasıl Çalışır?"
1. [ ] Click link in footer
2. [ ] Verify modal opens
3. [ ] Verify shows 6 steps
4. [ ] Click X to close

### "Sıkça Sorulan Sorular"
1. [ ] Click link in footer
2. [ ] Verify FAQ modal opens
3. [ ] Click a question
4. [ ] Verify answer expands
5. [ ] Click X to close

### "Yorum Yaz"
1. [ ] Click link in footer
2. [ ] Verify form modal opens
3. [ ] Verify rating stars present
4. [ ] Click X to close

### "Bize Ulaşın"
1. [ ] Click link in footer
2. [ ] Verify contact form opens
3. [ ] Verify all fields present
4. [ ] Click X to close

**Expected Result:** ✅ All 4 modals open and close properly

---

## 🌓 5. Theme Switching (1 min)

**Test Steps:**
1. [ ] Note current theme (light/dark)
2. [ ] Click theme toggle button (Sun/Moon icon)
3. [ ] Verify theme changes
4. [ ] Verify icon changes
5. [ ] Refresh page (Ctrl + R)
6. [ ] Verify theme persists

**Expected Result:** ✅ Smooth theme change, persists on reload

---

## 🤖 6. AI Assistant (1 min)

**Test Steps:**
1. [ ] Scroll to bottom-right corner
2. [ ] Verify bot button visible
3. [ ] Click bot button
4. [ ] Verify assistant panel opens
5. [ ] Verify random greeting displays
6. [ ] Click X button
7. [ ] Verify panel closes

**Expected Result:** ✅ Assistant opens/closes, greeting shows

---

## ⬆️ 7. Scroll to Top (1 min)

**Test Steps:**
1. [ ] Scroll down page (300+ pixels)
2. [ ] Verify arrow button appears (bottom-left)
3. [ ] Click arrow button
4. [ ] Verify smooth scroll to top
5. [ ] Verify button disappears

**Expected Result:** ✅ Button appears/disappears, smooth scroll

---

## 📱 8. Responsive Design (2 min)

**Test Steps:**
1. [ ] Resize browser to mobile width (~400px)
2. [ ] Verify single column layout
3. [ ] Verify search bar adapts
4. [ ] Resize to tablet width (~768px)
5. [ ] Verify 2-column layout
6. [ ] Resize to desktop (~1280px)
7. [ ] Verify 5-column layout

**Expected Result:** ✅ Layout adapts smoothly

---

## 🐛 9. Error Checking (1 min)

**Test Steps:**
1. [ ] Check browser console
2. [ ] Verify no red errors
3. [ ] Check for warnings:
   - [ ] Supabase warning (expected in demo mode)
4. [ ] Verify no broken images
5. [ ] Verify no broken links

**Expected Result:** ✅ Only expected warnings, no errors

---

## 💾 10. Data Flow (2 min)

**Test Steps:**
1. [ ] Open Network tab in DevTools
2. [ ] Click a book
3. [ ] Verify console logs:
   ```
   BookModal - Book data: {
     title: "...",
     author: "...",
     description: "...",
     ...
   }
   ```
4. [ ] Verify data is not null/undefined
5. [ ] If in Demo Mode, verify:
   - [ ] average_rating: 0
   - [ ] total_reviews: 0
   - [ ] (This is expected)

**Expected Result:** ✅ Data flows correctly, logged properly

---

## 🎯 Summary Checklist

**Core Features:**
- [ ] Search works
- [ ] Filter works
- [ ] Modal opens/closes
- [ ] Footer links work
- [ ] Theme switches
- [ ] AI Assistant works
- [ ] Scroll button works
- [ ] Responsive design
- [ ] No console errors
- [ ] Data displays correctly

**Enhanced Features:**
- [ ] Active filter badge shows
- [ ] Blue dot indicator works
- [ ] Selected category highlighted
- [ ] Checkmarks on selected items
- [ ] Click outside closes dropdowns
- [ ] ESC closes modals
- [ ] Debug logs in console

---

## ✅ Pass Criteria

**To PASS this test, you should see:**
- ✅ All 10 sections completed
- ✅ No unexpected console errors
- ✅ All modals open/close smoothly
- ✅ All interactive elements responsive
- ✅ Data displays in console logs
- ✅ Theme persists on reload

**Known Expected Behaviors in Demo Mode:**
- ⚠️ Ratings show 0.0 (no Supabase)
- ⚠️ Reviews show 0 (no Supabase)
- ⚠️ Console warning about Supabase (expected)
- ⚠️ Books from Open Library API (temporary)

**These are NOT bugs** - they're expected when Supabase isn't configured!

---

## 🎓 Quick Tips

1. **If something doesn't work:**
   - Check browser console
   - Hard refresh (Ctrl + Shift + R)
   - Clear cache
   - Restart dev server

2. **If modal doesn't show data:**
   - Check console logs
   - Verify book data is not null
   - This helps identify if issue is data or UI

3. **If filters don't work:**
   - Check if books are loaded
   - Verify console for errors
   - Try refreshing page

---

## 📊 Test Results

**Date Tested:** ___________  
**Tested By:** ___________  
**Browser:** ___________  
**Result:** PASS ☐ / FAIL ☐  

**Notes:**
```
_________________________________
_________________________________
_________________________________
```

---

**Total Test Time:** ~15 minutes  
**Difficulty:** Easy  
**Required Knowledge:** Basic web browsing

**After completing this checklist, you'll have verified all major functionality! 🎉**
