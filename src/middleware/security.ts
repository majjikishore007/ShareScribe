// export const  expressAuthentication=(request: Request, securityName: string, scopes?: string[]): Promise<any> => {

//   if (securityName === 'jwt') {
//     const token = request.headers.authorization.split(' ')[1];

//     return new Promise((resolve, reject) => {
//       if (!token) {
//         reject(new Error('No token provided'));
//       }
//       jwt.verify(token, '[secret]', function (err: any, decoded: any) {
//         if (err) {
//           reject(err);
//         } else {
//           // Check if JWT contains all required scopes
//           for (let scope of scopes) {
//             if (!decoded.scopes.includes(scope)) {
//               reject(new Error('JWT does not contain required scope.'));
//             }
//           }
//           resolve(decoded);
//         }
//       });
//     });
//   }
// }
