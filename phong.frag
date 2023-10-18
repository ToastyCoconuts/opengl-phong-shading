#version 330 core
out vec4 color;

in vec3 FragPos;
in vec3 Normal;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

vec3 phongShading()
{
    //ambient lighting
    vec3 ambient = 0.1f * lightColor;

    //diffuse lighting
    vec3 lightDirection = normalize(lightPos - FragPos);
    vec3 diffuse = max(dot(Normal, lightDirection), 0.0) * lightColor;

    //specular lighting
    vec3 viewDirection = normalize(viewPos - FragPos);
    vec3 reflectionDirection = reflect(-lightDirection, Normal);
    vec3 specular = pow(max(dot(viewDirection, reflectionDirection), 0.0), 32.0) * 0.5 * lightColor;

    //returning phong shading
    return (ambient + diffuse + specular) * objectColor;

}

void main()
{
    //setting output color to phongShading result
    color = vec4(phongShading(), 1.0f);
}
