// processData.js
export const processData = (jsonData) => {
    const templatesMap = new Map();
  
    jsonData.forEach((item) => {
      if (!templatesMap.has(item.name)) {
        templatesMap.set(item.name, {
          name: item.name,
          target: item.target,
          versions: {},
        });
      }
      const template = templatesMap.get(item.name);
      template.versions[item.version] = {
        version: item.version,
        location: item.metadata.location,
      };
    });
  
    return Array.from(templatesMap.values());
  };
  