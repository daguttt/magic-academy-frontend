interface Course {
  courseId: number;
  courseName: string;
  progress: number;
}
  
interface ApiResponse {
    code: number;
    message: string;
    data: Course[];
}
  
export async function fetchUserCourses (token: string): Promise<ApiResponse> {
    const response = await fetch('http://localhost:3002/api/users/user/enrolled-courses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al obtener los cursos');
    }
  
    const data = await response.json();
    return {
      code: data.code,
      message: data.message,
      data: data.data,
    };
  };
  