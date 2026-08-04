type TechnologyResult = {
    technologies: string[];
    categories: {
      frontend: string[];
      backend: string[];
      infrastructure: string[];
    };
  };
  
  
  
  export function analyzeTechnology(
    headers: Headers,
    html: string
  ): TechnologyResult {
  
  
    const technologies:string[] = [];
  
    const frontend:string[] = [];
  
    const backend:string[] = [];
  
    const infrastructure:string[] = [];
  
  
  
  
    const content =
      html.toLowerCase();
  
  
  
  
  
    /*
      FRONTEND DETECTION
    */
  
  
    if (
      content.includes(
        "__next"
      )
    ) {
  
      technologies.push(
        "Next.js"
      );
  
      frontend.push(
        "Next.js"
      );
  
    }
  
  
  
  
  
    if (
      content.includes(
        "react"
      )
    ) {
  
      technologies.push(
        "React"
      );
  
      frontend.push(
        "React"
      );
  
    }
  
  
  
  
  
  
  
    if (
      content.includes(
        "wordpress"
      )
    ) {
  
  
      technologies.push(
        "WordPress"
      );
  
  
      frontend.push(
        "WordPress"
      );
  
  
    }
  
  
  
  
  
  
  
  
  
    /*
      SERVER DETECTION
    */
  
  
    const server =
      headers.get(
        "server"
      );
  
  
  
    if(server){
  
  
      technologies.push(
        server
      );
  
  
      backend.push(
        server
      );
  
  
    }
  
  
  
  
  
  
  
  
    /*
      CDN DETECTION
    */
  
  
    const powered =
      headers.get(
        "x-powered-by"
      );
  
  
  
    if(powered){
  
  
      technologies.push(
        powered
      );
  
  
      backend.push(
        powered
      );
  
  
    }
  
  
  
  
  
  
  
    if(
      headers.has(
        "cf-ray"
      )
    ){
  
      technologies.push(
        "Cloudflare"
      );
  
  
      infrastructure.push(
        "Cloudflare CDN"
      );
  
  
    }
  
  
  
  
  
  
  
    return {
  
  
      technologies:
  
  
        [...new Set(
          technologies
        )],
  
  
  
      categories:{
  
        frontend,
  
        backend,
  
        infrastructure,
  
      }
  
  
    };
  
  
  }