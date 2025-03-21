let timerInterval;
let timeLeft = 25 * 60; // Initial timer duration (25 minutes in seconds)
let timerRunning = false;

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function updateTimer() {
  document.getElementById('timer').textContent = formatTime(timeLeft);
}

function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        alert('Pomodoro session finished!');
        timeLeft = 25 * 60; // Reset timer to default (25 minutes in seconds)
        updateTimer();
      }
    }, 1000); // Update every second
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timeLeft = 25 * 60; // Reset timer to default (25 minutes in seconds)
  updateTimer();
}

function setCustomTimer() {
  let timerInput = document.getElementById('timerInput');
  let customTime = parseInt(timerInput.value, 10);
  
  if (!isNaN(customTime) && customTime >= 1 && customTime <= 60) {
    timeLeft = customTime * 60; // Convert minutes to seconds
    updateTimer();
  } else {
    alert('Please enter a valid timer duration between 1 and 60 minutes.');
  }
}

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let task = taskInput.value.trim();
  
  if (task !== '') {
    createTaskElement(task);
    taskInput.value = ''; // Clear input field after adding task
  } else {
    alert('Please enter a task.');
  }
}

function createTaskElement(task) {
  // Create task item element
  let taskList = document.getElementById('taskList');
  let taskItem = document.createElement('div');
  taskItem.classList.add('taskItem');
  
  // Task text
  let taskText = document.createElement('span');
  taskText.textContent = task;
  taskItem.appendChild(taskText);
  
  // Delete button
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('deleteTaskButton');
  deleteButton.addEventListener('click', function() {
    taskItem.remove();
  });
  taskItem.appendChild(deleteButton);
  
  // Add task item to task list
  taskList.appendChild(taskItem);
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setCustomTimer);
document.getElementById('addTaskButton').addEventListener('click', addTask);

// Initialize timer display
updateTimer();
