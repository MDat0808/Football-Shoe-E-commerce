import { computed, Ref } from "vue";

export default function usePagination(
  totalPage: number,
  currentPage: Ref<number>,
  siblingCount: number = 1
) {
  // Helper function to generate a range of numbers
  const generateArr = (start: number, end: number) => {
    const length: number = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  };

  // Computed property for pagination array
  const pagination = computed(() => {
    const minPagination = 6;

    // If total pages are less than minimum pagination, return all pages
    if (totalPage <= minPagination) return generateArr(1, totalPage);

    const isShowLeft = currentPage.value - siblingCount > 2;
    const isShowRight = currentPage.value + siblingCount < totalPage - 1;

    // Case 1: Show left ellipsis when current page is near the end
    if (isShowLeft && !isShowRight) {
      const rightStart = totalPage - 3;
      const rightArr = generateArr(rightStart, totalPage);
      return [1, "...", ...rightArr];
    }

    // Case 2: Show right ellipsis when current page is near the start
    if (!isShowLeft && isShowRight) {
      const leftArr = generateArr(1, 4);
      return [...leftArr, "...", totalPage - 1, totalPage];
    }

    // Case 3: Show both left and right ellipses when current page is in the middle
    const siblingLeft = Math.max(currentPage.value - siblingCount, 1);
    const siblingRight = Math.min(currentPage.value + siblingCount, totalPage);

    if (isShowLeft && isShowRight) {
      const middleArr = generateArr(siblingLeft, siblingRight);
      const leftArr = generateArr(1, 2);
      return [...leftArr, "...", ...middleArr, "...", totalPage];
    }
    return [];
  });

  // Return the computed pagination, but only access the value in the components
  return pagination;
}
