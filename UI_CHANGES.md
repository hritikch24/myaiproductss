# Changes Documentation

This document tracks all changes (UI/UX and Backend) made to the application.

## Changes Log

### 2026-02-28 (Latest)

#### 1. Calendar/DatePicker Fix
**Files Modified:** `src/components/date-picker.tsx`, `src/components/ui/calendar.tsx`

**Issue:** Calendar dates were invisible due to blue background and white text in dark popover.

**Fixes:**
- Added explicit white text colors for calendar days in dark popover context
- Added `formatWeekdayName` formatter to display weekday abbreviations correctly (S, M, T, W, T, F, S)
- Added proper flex styling to weekdays row with centered text and padding
- Fixed hydration mismatch error by adding `mounted` state check for server/client rendering

#### 2. DatePicker Text Color Fix
**Files Modified:** `src/components/date-picker.tsx`

**Issue:** Hardcoded `text-white` on selected date broke on light backgrounds.

**Fix:**
- Changed `text-white` to `text-foreground` for dynamic theming support
- Changed `text-slate-400` to `text-muted-foreground` for consistency

#### 3. Hydration Error Fix
**Files Modified:** `src/components/date-picker.tsx`, `src/components/smart-fill.tsx`

**Issue:** React hydration errors due to Radix UI components generating different IDs on server vs client.

**Fix:**
- Used `useSyncExternalStore` for SSR-safe client detection
- Render static placeholder before client-side mount
- Added `suppressHydrationWarning` to buttons

#### 4. UI Review Items (Verified)
The following items were reviewed and found to be already implemented:

- **Form Labels:** Labels already have `font-medium` class (document-form.tsx line 295)
- **Empty States:** Both dashboard and documents page have proper empty state messages
- **Input Focus States:** Already have proper `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` styling
- **Mobile Responsiveness:** Cards use responsive grid (`sm:grid-cols-2 lg:grid-cols-3`) with `h-full` for equal height
- **Theme Consistency:** Dashboard uses dark theme to match landing page

### Recommendations for Future Improvements

1. **Theme Unification:** Consider creating a unified theme system to ensure consistent dark/light mode across all pages
2. **Loading States:** Add more detailed loading feedback during document generation
3. **Payment Modal:** Verify accessibility (keyboard trapping, focus management)
4. **ARIA Live Regions:** Add aria-live="polite" for form error announcements to screen readers

---

## Changes Log

### 2026-02-28 (Additional Updates)

#### 4. Smart Fill - PDF Support
**Files Modified:** `src/components/smart-fill.tsx`, `src/app/api/documents/extract-pdf/route.ts` (new)

**Fixes:**
- Added PDF file upload support using pdf-parse
- Added separate buttons for PDF and text file uploads
- Added uploading state for better UX
- Created new API endpoint `/api/documents/extract-pdf` for PDF text extraction

#### 5. Freelancer Contract - Address Fields
**Files Modified:** `src/app/(app)/dashboard/freelancer-contract/page.tsx`, `src/lib/prompts.ts`

**Fixes:**
- Added `client_address` field (textarea)
- Added `freelancer_address` field (textarea)
- Updated prompt to include addresses in parties section

#### 6. NDA - Address Fields
**Files Modified:** `src/app/(app)/dashboard/nda/page.tsx`, `src/lib/prompts.ts`

**Fixes:**
- Added `disclosing_party_address` field
- Added `receiving_party_address` field
- Updated prompt to include addresses in parties section

#### 7. Multi-Language Support
**Files Modified:** `src/app/(app)/dashboard/*/page.tsx`, `src/lib/prompts.ts`

**Added Languages:**
- English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Both (English + Hindi)

**Changes:**
- Updated prompts.ts with `LANGUAGE_CONFIG` for all supported Indian languages
- Updated buildUserMessage function to handle all languages
- Added language options to all document form pages

#### 8. PDF White Background/Font Fix
**Files Modified:** `src/components/document-pdf.tsx`

**Issue:** Generated PDF had white background with invisible white text.

**Fix:**
- Added explicit `color: "#000000"` to all text styles
- Added explicit `backgroundColor: "#ffffff"` to page styles
- Ensured consistent hex color format (#000000 instead of #000)
