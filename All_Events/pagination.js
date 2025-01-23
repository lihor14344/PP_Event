const eventsPerPage = 12;
let currentPage = 1;
const events = document.querySelectorAll('.event-card'); // All event cards
const totalEvents = events.length; // Total number of events
const totalPages = Math.ceil(totalEvents / eventsPerPage); // Total pages based on events

const paginationContainer = document.querySelector('.pagination'); // The pagination container
const prevButton = paginationContainer.querySelector('.prev');
const nextButton = paginationContainer.querySelector('.next');

// Function to update the pagination
function updatePagination() {
  // Hide all event cards
  events.forEach(event => event.style.display = 'none');

  // Show the events for the current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const eventsToShow = Array.from(events).slice(startIndex, endIndex);
  eventsToShow.forEach(event => event.style.display = 'block');

  // Update pagination links
  const pageLinks = paginationContainer.querySelectorAll('a');
  pageLinks.forEach(link => link.classList.remove('active'));

  const pageNumbers = paginationContainer.querySelector('.page-numbers');
  pageNumbers.innerHTML = ''; // Clear old page numbers

  // Create page numbers dynamically
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.innerText = i;
    if (i === currentPage) {
      pageLink.classList.add('active');
    }
    pageLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      updatePagination();
    });
    pageNumbers.appendChild(pageLink);
  }

  // Enable/Disable Prev and Next buttons
  prevButton.classList.toggle('disabled', currentPage === 1);
  nextButton.classList.toggle('disabled', currentPage === totalPages);
}

// Event listener for Prev button
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--; // Move to the previous page
    updatePagination(); // Update the page display
  }
});

// Event listener for Next button
nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++; // Move to the next page
    updatePagination(); // Update the page display
  }
});

// Initialize pagination on page load
updatePagination();
