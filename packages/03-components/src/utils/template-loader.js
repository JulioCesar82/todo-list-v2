export async function loadAndAppendTemplate(templatePath, templateId) {
  if (document.getElementById(templateId)) {
    return; // Template already in DOM
  }

  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Failed to load template from ${templatePath}: ${response.statusText}`);
    }
    const htmlString = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const templateElement = tempDiv.querySelector('template');

    if (templateElement && templateElement.id === templateId) {
      document.body.appendChild(templateElement);
    } else {
      console.error(`Template with ID '${templateId}' not found in ${templatePath} or ID mismatch.`);
    }
  } catch (error) {
    console.error(`Error loading or appending template '${templateId}' from '${templatePath}':`, error);
  }
}
