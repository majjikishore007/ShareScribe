import path from 'path';

export const getSwaggerDoc = async (): Promise<any> => {
  const swaggerDocPath = path.join(__dirname, '../../Public/swagger.json');

  try {
    const swaggerDoc = await import(swaggerDocPath);
    return swaggerDoc;
  } catch (error) {
    console.error('Failed to load swaggerDoc:', error);
    throw error;
  }
};
