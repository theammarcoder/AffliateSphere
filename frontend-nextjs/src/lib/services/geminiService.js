import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractProductDetails = async (affiliateLink) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        success: false,
        error: 'Gemini API key is not configured'
      };
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Act as a product data extraction tool. Based on the following product page link: '${affiliateLink}', extract and return ONLY a JSON object with these two keys: 'title' (a concise product title) and 'description' (a 1-2 paragraph product description summarizing key features). Do not include any other text or explanations in your response. If you cannot access the link directly, generate realistic product information based on the URL structure and common product naming conventions.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/g, '');
    }
    
    const productData = JSON.parse(cleanText);
    
    if (!productData.title || !productData.description) {
      throw new Error('Invalid response format from AI');
    }
    
    return {
      success: true,
      data: {
        title: productData.title,
        description: productData.description
      }
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch product details. Please check the link or try again.'
    };
  }
};

