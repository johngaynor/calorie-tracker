import { useEffect } from "react";

import styles from "./stepForm.css";

function StepForm() {
  useEffect(() => {
    const multiStepForm = document.querySelector("[data-multi-step]");
    const formSteps = multiStepForm.querySelectorAll("[data-step]");
    console.log(formSteps);
    let currentStep = formSteps.findIndex((step) => {
      return step.classList.contains("active");
    });
    console.log(currentStep);

    // if (isNaN(currentStep)) {
    //   formSteps.find();
    // }
  });

  return (
    <form data-multi-step className="w-75 mx-auto p-5 text-black">
      <div className="form-card active" data-step>
        <p>1</p>
        <button type="button">Next</button>
      </div>
      <div className="form-card" data-step>
        <p>2</p>

        <button type="button">Previous</button>
        <button type="button">Next</button>
      </div>
      <div className="form-card" data-step>
        <p>3</p>

        <button type="button">Previous</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default StepForm;
