import { useEffect } from "react";

import styles from "./stepForm.css";

function StepForm() {
  useEffect(() => {
    const multiStepForm = document.querySelector("[data-multi-step]");
    const formSteps = Array.from(multiStepForm.querySelectorAll("[data-step]"));

    let currentStep = formSteps.findIndex((step) => {
      return step.classList.contains("active");
    });
    // console.log(currentStep);

    if (currentStep < 0) {
      currentStep = 0;
      formSteps[currentStep].classList.add("active");
      showCurrentStep();
    }

    multiStepForm.addEventListener("click", (e) => {
      if (e.target.matches("[data-next]")) {
        currentStep += 1;
      } else if (e.target.matches("[data-previous]")) {
        currentStep -= 1;
      }
      showCurrentStep();
    });

    function showCurrentStep() {
      formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
      });
    }
  });

  // problem ended up being that nodeList doesn't work with findIndex, had to convert it to an array first

  return (
    <form data-multi-step className="w-75 mx-auto p-5 text-black">
      <div className="form-card" data-step>
        <p>1</p>
        <button type="button" data-next>
          Next
        </button>
      </div>
      <div className="form-card" data-step>
        <p>2</p>

        <button type="button" data-previous>
          Previous
        </button>
        <button type="button" data-next>
          Next
        </button>
      </div>
      <div className="form-card" data-step>
        <p>3</p>

        <button type="button" data-previous>
          Previous
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default StepForm;
