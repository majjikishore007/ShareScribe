import path from 'path';

export const getSwaggerDoc = async (): Promise<any> => {
  const swaggerDocPath = path.join(__dirname, '../../Public/swagger.json');

  try {
    const swaggerDoc = await import(swaggerDocPath);
    return swaggerDoc; // Assuming the JSON is exported as default
  } catch (error) {
    console.error('Failed to load swaggerDoc:', error);
    throw error; // Rethrow the error so the caller can handle it
  }
};
