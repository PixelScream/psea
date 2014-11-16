// Shader created with Shader Forge Beta 0.36 
// Shader Forge (c) Joachim Holmer - http://www.acegikmo.com/shaderforge/
// Note: Manually altering this data may prevent you from opening it in Shader Forge
/*SF_DATA;ver:0.36;sub:START;pass:START;ps:flbk:,lico:1,lgpr:1,nrmq:1,limd:0,uamb:True,mssp:True,lmpd:False,lprd:False,enco:False,frtr:True,vitr:True,dbil:False,rmgx:True,rpth:0,hqsc:True,hqlp:False,tesm:0,blpr:0,bsrc:0,bdst:0,culm:0,dpts:2,wrdp:True,ufog:True,aust:True,igpj:False,qofs:0,qpre:1,rntp:1,fgom:False,fgoc:False,fgod:False,fgor:False,fgmd:0,fgcr:0.5,fgcg:0.5,fgcb:0.5,fgca:1,fgde:0.01,fgrn:0,fgrf:300,ofsf:0,ofsu:0,f2p0:False;n:type:ShaderForge.SFN_Final,id:1,x:32157,y:32658|emission-293-OUT,custl-50-OUT;n:type:ShaderForge.SFN_VertexColor,id:2,x:32862,y:32796;n:type:ShaderForge.SFN_Fresnel,id:3,x:33069,y:33202|EXP-47-OUT;n:type:ShaderForge.SFN_Dot,id:4,x:33450,y:32907,dt:1|A-6-OUT,B-7-OUT;n:type:ShaderForge.SFN_LightVector,id:6,x:33671,y:32839;n:type:ShaderForge.SFN_NormalVector,id:7,x:33671,y:32976,pt:False;n:type:ShaderForge.SFN_Add,id:9,x:32862,y:33038|A-15-OUT,B-45-OUT;n:type:ShaderForge.SFN_Power,id:15,x:33041,y:32905|VAL-20-OUT,EXP-22-OUT;n:type:ShaderForge.SFN_Multiply,id:20,x:33233,y:32905|A-4-OUT,B-21-OUT;n:type:ShaderForge.SFN_Vector1,id:21,x:33322,y:33071,v1:1.5;n:type:ShaderForge.SFN_Vector1,id:22,x:33156,y:33071,v1:2;n:type:ShaderForge.SFN_Power,id:45,x:32862,y:33202|VAL-3-OUT,EXP-46-OUT;n:type:ShaderForge.SFN_Vector1,id:46,x:32851,y:33355,v1:10;n:type:ShaderForge.SFN_Vector1,id:47,x:33069,y:33364,v1:0.08;n:type:ShaderForge.SFN_LightAttenuation,id:49,x:32450,y:33040;n:type:ShaderForge.SFN_Multiply,id:50,x:32450,y:32889|A-197-OUT,B-49-OUT;n:type:ShaderForge.SFN_Add,id:197,x:32643,y:32889|A-2-RGB,B-199-OUT;n:type:ShaderForge.SFN_Vector1,id:198,x:32643,y:33178,v1:0.2;n:type:ShaderForge.SFN_Multiply,id:199,x:32643,y:33040|A-9-OUT,B-198-OUT;n:type:ShaderForge.SFN_FragmentPosition,id:291,x:32450,y:32567;n:type:ShaderForge.SFN_ConstantClamp,id:293,x:32450,y:32707,min:0,max:0.01|IN-291-Y;pass:END;sub:END;*/

Shader "Shader Forge/Vertex_Cel" {
    Properties {
    }
    SubShader {
        Tags {
            "RenderType"="Opaque"
        }
        Pass {
            Name "ForwardBase"
            Tags {
                "LightMode"="ForwardBase"
            }
            
            
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #define UNITY_PASS_FORWARDBASE
            #include "UnityCG.cginc"
            #include "AutoLight.cginc"
            #pragma multi_compile_fwdbase_fullshadows
            #pragma exclude_renderers xbox360 ps3 flash d3d11_9x 
            #pragma target 3.0
            struct VertexInput {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                float4 vertexColor : COLOR;
            };
            struct VertexOutput {
                float4 pos : SV_POSITION;
                float4 posWorld : TEXCOORD0;
                float3 normalDir : TEXCOORD1;
                float4 vertexColor : COLOR;
                LIGHTING_COORDS(2,3)
            };
            VertexOutput vert (VertexInput v) {
                VertexOutput o;
                o.vertexColor = v.vertexColor;
                o.normalDir = mul(float4(v.normal,0), _World2Object).xyz;
                o.posWorld = mul(_Object2World, v.vertex);
                o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
                TRANSFER_VERTEX_TO_FRAGMENT(o)
                return o;
            }
            fixed4 frag(VertexOutput i) : COLOR {
                i.normalDir = normalize(i.normalDir);
                float3 viewDirection = normalize(_WorldSpaceCameraPos.xyz - i.posWorld.xyz);
/////// Normals:
                float3 normalDirection =  i.normalDir;
                float3 lightDirection = normalize(_WorldSpaceLightPos0.xyz);
////// Lighting:
                float attenuation = LIGHT_ATTENUATION(i);
////// Emissive:
                float node_293 = clamp(i.posWorld.g,0,0.01);
                float3 emissive = float3(node_293,node_293,node_293);
                float3 finalColor = emissive + ((i.vertexColor.rgb+((pow((max(0,dot(lightDirection,i.normalDir))*1.5),2.0)+pow(pow(1.0-max(0,dot(normalDirection, viewDirection)),0.08),10.0))*0.2))*attenuation);
/// Final Color:
                return fixed4(finalColor,1);
            }
            ENDCG
        }
        Pass {
            Name "ForwardAdd"
            Tags {
                "LightMode"="ForwardAdd"
            }
            Blend One One
            
            
            Fog { Color (0,0,0,0) }
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #define UNITY_PASS_FORWARDADD
            #include "UnityCG.cginc"
            #include "AutoLight.cginc"
            #pragma multi_compile_fwdadd_fullshadows
            #pragma exclude_renderers xbox360 ps3 flash d3d11_9x 
            #pragma target 3.0
            struct VertexInput {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                float4 vertexColor : COLOR;
            };
            struct VertexOutput {
                float4 pos : SV_POSITION;
                float4 posWorld : TEXCOORD0;
                float3 normalDir : TEXCOORD1;
                float4 vertexColor : COLOR;
                LIGHTING_COORDS(2,3)
            };
            VertexOutput vert (VertexInput v) {
                VertexOutput o;
                o.vertexColor = v.vertexColor;
                o.normalDir = mul(float4(v.normal,0), _World2Object).xyz;
                o.posWorld = mul(_Object2World, v.vertex);
                o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
                TRANSFER_VERTEX_TO_FRAGMENT(o)
                return o;
            }
            fixed4 frag(VertexOutput i) : COLOR {
                i.normalDir = normalize(i.normalDir);
                float3 viewDirection = normalize(_WorldSpaceCameraPos.xyz - i.posWorld.xyz);
/////// Normals:
                float3 normalDirection =  i.normalDir;
                float3 lightDirection = normalize(lerp(_WorldSpaceLightPos0.xyz, _WorldSpaceLightPos0.xyz - i.posWorld.xyz,_WorldSpaceLightPos0.w));
////// Lighting:
                float attenuation = LIGHT_ATTENUATION(i);
                float3 finalColor = ((i.vertexColor.rgb+((pow((max(0,dot(lightDirection,i.normalDir))*1.5),2.0)+pow(pow(1.0-max(0,dot(normalDirection, viewDirection)),0.08),10.0))*0.2))*attenuation);
/// Final Color:
                return fixed4(finalColor * 1,0);
            }
            ENDCG
        }
    }
    FallBack "Diffuse"
    CustomEditor "ShaderForgeMaterialInspector"
}
