const backendAddress = 'http://127.0.0.1:8000/'; 
const tipos_atividade = ["carona", "estudos", "ligas", "extracurriculares", "conhecer_pessoas"];
const nome_atividade: Record<string, string> = {"carona": "Carona", 
                                                'estudos': 'Grupo de Estudos', 
                                                'ligas': 'Ligas Acadêmicas', 
                                                'extracurriculares': 'Atividades Extracurriculares', 
                                                'conhecer_pessoas': 'Conhecer Pessoas'};
const tokenKeyword = 'Token ';

const campos: Record<string, Array<Array<string>>> = {"carona": [['local_chegada', 'Destino'], ['local_saida', 'Saindo de']], 
    'estudos': [['materia', 'Disciplina'], ['local', 'Local']], 
    'ligas': [['nome', 'Nome'], ['local', 'Local']], 
    'extracurriculares': [['atividade', 'Atividade'], ['local', 'Local']], 
    'conhecer_pessoas': [['atividade', 'Atividade'], ['local', 'Local']]};