let currentPage = "login";
let selectedProject = null;
let currentStep = 1;
let selections = {
  tower: "",
  category: "",
  unit: "",
  room: "",
};

async function loadComponent(name) {
  try {
    const response = await fetch(`components/${name}.html`);
    return await response.text();
  } catch (error) {
    console.error(`Error loading component ${name}:`, error);
    return '';
  }
}

async function renderPage() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  switch (currentPage) {
    case "login":
      root.innerHTML = await loadComponent('login');
      break;
    case "projects":
      root.innerHTML = await loadComponent('navbar') + await loadComponent('projects');
      break;
    case "projectDetails":
      root.innerHTML = await loadComponent('navbar') + await getStepContent();
      break;
    case "camera":
      root.innerHTML = await loadComponent('navbar') + await loadComponent('camera');
      break;
    case "notifications":
      root.innerHTML = await loadComponent('navbar') + await loadComponent('notifications');
      break;
  }
}

function getStepContent() {
  let content = '<div class="project-details"><h2>Project: ' + selectedProject + '</h2>';
  content += '<div class="dropdown-container"><div class="selection-group">';

  if (currentStep > 1) {
    content += `
      <div class="selected-info">
        <div>Tower: ${selections.tower}</div>
        <div>Category: ${selections.category}</div>
      </div>
    `;
  }
  
  if (currentStep > 2) {
    content += `
      <div class="selected-info">
        <div>Unit: ${selections.unit}</div>
      </div>
    `;
  }
  
  if (currentStep > 3) {
    content += `
      <div class="selected-info">
        <div>Room: ${selections.room}</div>
      </div>
    `;
  }

  switch (currentStep) {
    case 1:
      content += `
        <select id="tower">
          <option value="">Select Tower</option>
          <option value="Tower 1">Tower 1</option>
          <option value="Tower 2">Tower 2</option>
          <option value="Tower 3">Tower 3</option>
          <option value="Tower 4">Tower 4</option>
          <option value="Tower 5">Tower 5</option>
          <option value="Tower 6">Tower 6</option>
          <option value="Other">Other</option>
        </select>
        <select id="category">
          <option value="">Select Category</option>
          <option value="C 20">C 20</option>
          <option value="C 20p">C 20p</option>
          <option value="C 25">C 25</option>
          <option value="D 35">D 35</option>
          <option value="H 20">H 20</option>
          <option value="I 20">I 20</option>
          <option value="L 20">L 20</option>
          <option value="L 21">L 21</option>
        </select>
      `;
      break;
    case 2:
      content += `
        <select id="unit">
          <option value="">Select Unit</option>
          <option value="Unit 1">Unit 1</option>
          <option value="Unit 2">Unit 2</option>
          <option value="Unit 3">Unit 3</option>
          <option value="Unit 4">Unit 4</option>
          <option value="Unit 5">Unit 5</option>
        </select>
      `;
      break;
    case 3:
      content += `
        <select id="room">
          <option value="">Select Room</option>
          <option value="Hall">Hall</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Dinning">Dinning</option>
          <option value="Terrace">Terrace</option>
          <option value="Master Bedroom">Master Bedroom</option>
          <option value="Kid's Bedroom">Kid's Bedroom</option>
          <option value="Guest Bedroom">Guest Bedroom</option>
        </select>
      `;
      break;
    case 4:
      content += `
        <div class="camera-box" onclick="showCamera()">
          <i class="fas fa-camera fa-3x"></i>
        </div>
      `;
      break;
  }

  if (currentStep < 4) {
    content += '<button class="continue-btn" onclick="nextStep()">Continue</button>';
  }

  content += '</div></div></div>';
  return content;
}

window.handleLogin = () => {
  const employeeId = document.getElementById("employeeId").value;
  const password = document.getElementById("password").value;

  if (
   true
  ) {
    currentPage = "projects";
    renderPage();
  } else {
    alert("Invalid credentials");
  }
};

window.handleLogout = () => {
  currentPage = "login";
  renderPage();
};

window.toggleSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
};

window.navigateTo = (page) => {
  currentPage = page;
  renderPage();
};

window.selectProject = (project) => {
  selectedProject = project;
  currentPage = "projectDetails";
  currentStep = 1;
  selections = {
    tower: "",
    category: "",
    unit: "",
    room: "",
  };
  renderPage();
};

window.nextStep = () => {
  switch (currentStep) {
    case 1:
      const tower = document.querySelector("#tower").value;
      const category = document.querySelector("#category").value;
      if (!tower || !category) {
        alert("Please select both Tower and Category");
        return;
      }
      selections.tower = tower;
      selections.category = category;
      break;
    case 2:
      const unit = document.querySelector("#unit").value;
      if (!unit) {
        alert("Please select a Unit");
        return;
      }
      selections.unit = unit;
      break;
    case 3:
      const room = document.querySelector("#room").value;
      if (!room) {
        alert("Please select a Room");
        return;
      }
      selections.room = room;
      break;
  }

  if (currentStep < 4) {
    currentStep++;
    renderPage();
  } else {
    currentPage = "camera";
    renderPage();
  }
};

renderPage();