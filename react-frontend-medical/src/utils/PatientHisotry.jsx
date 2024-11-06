export const patient_heath_history_options = [
  {
    label: "ANTECEDENTES PATOLÓGICOS",
    open_menu: false,
    column_name: "pathological_history",
    form_options: [
      {
        label: "Hospitalización Previa",
        column_name: "previous_hospitalization",
        type: "check",
      },
      {
        label: "Cirugías Previas",
        column_name: "previous_surgeries",
        type: "check",
      },
      {
        label: "Diabetes",
        column_name: "diabetes",
        type: "check",
      },
      {
        label: "Enfermedades Tiroideas",
        column_name: "thyroid_diseases",
        type: "check",
      },
      {
        label: "Hipertensión Arterial",
        column_name: "arterial_hypertension",
        type: "check",
      },
      {
        label: "Cardiopatias",
        column_name: "cardiopary",
        type: "check",
      },
      {
        label: "Traumatismos",
        column_name: "trauma",
        type: "check",
      },
      {
        label: "Cáncer",
        column_name: "cancer",
        type: "check",
      },
      {
        label: "Tuberculosis",
        column_name: "tuberculosis",
        type: "check",
      },
      {
        label: "Transfusiones",
        column_name: "transfusions",
        type: "check",
      },
      {
        label: "Patologías Respiratorias",
        column_name: "respiratory_pathologies",
        type: "check",
      },
      {
        label: "Patologías Gastrointestinales",
        column_name: "gastrointestinal_pathologies",
        type: "check",
      },
      {
        label: "Enfermedades de Transmisión Sexual",
        column_name: "sexually_transmitted_diseases",
        type: "check",
      },

      {
        label: "Enfermedad Renal Crónica",
        column_name: "chronic_kidney_disease",
        type: "check",
      },
      {
        label: "Otros",
        column_name: "others",
        type: "text",
      },
    ],
  },
  {
    label: "ANTECEDENTES NO PATOLÓGICOS",
    open_menu: false,
    column_name: "non_pathological_history",
    form_options: [
      {
        label: "Actividad Física",
        column_name: "physical_activity",
        type: "check",
      },
      {
        label: "Tabaquismo",
        column_name: "smoking",
        type: "check",
      },
      {
        label: "Alcoholismo",
        column_name: "alcoholism",
        type: "check",
      },
      {
        label: "Uso de otras sustancias (Drogas)",
        column_name: "drugs",
        type: "check",
      },
      {
        label: "Vacuna o Inmunización reciente",
        column_name: "recent_vaccine_or_immunization",
        type: "check",
      },
      {
        label: "Otros",
        column_name: "others",
        type: "check",
      },
    ],
  },
  {
    label: "ANTECEDENTES HEREDOFAMILIARES",
    open_menu: false,
    column_name: "hereditary_family_history",
    form_options: [
      {
        label: "Diabetes",
        column_name: "diabetes",
        type: "check",
      },
      {
        label: "Cardiopatías",
        column_name: "heart_disease",
        type: "check",
      },
      {
        label: "Hipertensión Arterial",
        column_name: "arterial_hypertension",
        type: "check",
      },
      {
        label: "Enfermedades Tiroideas",
        column_name: "thyroid_diseases",
        type: "check",
      },
      {
        label: "Enfermedad Renal Crónica",
        column_name: "chronic_kidney_disease",
        type: "check",
      },
      {
        label: "Otros",
        column_name: "others",
        type: "check",
      },
    ],
  },
  {
    label: "ANTECEDENTES GINECO-OBSTETRICOS",
    open_menu: false,
    column_name: "obstetric_gynecological_history",
    form_options: [
      {
        label: "Fecha de primera menstruación",
        column_name: "first_menstruation",
        type: "date",
      },
      {
        label: "Fecha de última menstruación",
        column_name: "last_menstruation",
        type: "date",
      },
      {
        label: "Características menstruación",
        column_name: "menstruation_characteristics",
        type: "text",
      },
      {
        label: "Embarazos",
        column_name: "pregnancies",
        type: "check",
      },
      {
        label: "Cáncer Cérvico",
        column_name: "cervical_cancer",
        type: "check",
      },
      {
        label: "Cáncer Uterino",
        column_name: "uterine_cancer",
        type: "check",
      },
      {
        label: "Cáncer de Mama",
        column_name: "breast_cancer",
        type: "check",
      },
      {
        label: "Actividad sexual del paciente",
        column_name: "patients_sexual_activity",
        type: "check",
      },
      {
        label: "Terapia de reemplazo hormonal",
        column_name: "hormone_replacement_therapy",
        type: "check",
      },
      {
        label: "Otros",
        column_name: "others",
        type: "check",
      },
      {
        label: "Método de Planificación Familiar",
        column_name: "family_planning_method",
        type: "text",
      },
      {
        label: "Ultimo Papanicolau",
        column_name: "last_pap_smear",
        type: "date",
      },
      {
        label: "Ultima Mastografía",
        column_name: "last_mammography",
        type: "date",
      },
    ],
  },
  {
    label: "ANTECEDENTES PERINATALES",
    open_menu: false,
    column_name: "perinatal_history",
    form_options: [
      {
        label: "Último ciclo menstrual",
        column_name: "last_menstrual_cycle",
        type: "date",
      },
      {
        label: "Duración ciclo",
        column_name: "cycle_duration",
        type: "text",
      },
      {
        label: "Último método anticonceptivo usado",
        column_name: "last_contraceptive_method_used",
        type: "text",
      },
      {
        label: "Concepción asistida",
        column_name: "assisted_conception",
        type: "check",
      },
      {
        label: "Fecha probable de parto por UCM",
        column_name: "estimated_due_date_based_on_LMP",
        type: "date",
      },
      {
        label: "FPP Final",
        column_name: "EDD",
        type: "text",
      },
      {
        label: "Notas sobre el Embarazo",
        column_name: "pregnancy_notes",
        type: "text",
      },
    ],
    //component: <AntecedentesPerinatalesForm />,
  },
  {
    label: "ANTECEDENTES POSTNATALES",
    open_menu: false,
    column_name: "postnatal_history",
    form_options: [
      {
        label: "Detalles de parto",
        column_name: "birth_details",
        type: "text",
      },
      {
        label: "Nombre del bebé",
        column_name: "babys_name",
        type: "text",
      },
      {
        label: "Peso al nacer",
        column_name: "birth_weight",
        type: "text",
      },
      {
        label: "Salud del bebé",
        column_name: "baby_health",
        type: "text",
      },
      {
        label: "Alimentación del bebé",
        column_name: "baby_feeding",
        type: "select",
        options: ["Sólo pecho", "Sólo formula", "Pecho y Formula"],
      },
      {
        label: "Estado emocional",
        column_name: "emotional_state",
        type: "text",
      },
    ],
    //component: <AntecedentesPostanatalesForm />,
  },
  {
    label: "ANTECEDENTES PSIQUIÁTRICOS",
    open_menu: false,
    column_name: "psychiatric_history",
    form_options: [
      {
        label: "Historia Familiar",
        column_name: "family_history",
        type: "text",
      },
      {
        label: "Conciencia de la enfermedad",
        column_name: "disease_awareness",
        type: "check",
      },
      {
        label: "Áreas afectadas por la enfermedad",
        column_name: "areas_affected_by_the_disease",
        type: "text",
      },
      {
        label: "Tratamientos pasados y actuales",
        column_name: "past_and_current_treatments",
        type: "text",
      },
      {
        label: "Apoyo del grupo familiar o social",
        column_name: "support_from_the_family_or_social_group",
        type: "check",
      },
      {
        label: "Grupo familiar del paciente",
        column_name: "patients_family_group",
        type: "text",
      },
      {
        label: "Aspectos de la vida social",
        column_name: "aspects_of_social_life",
        type: "text",
      },
      {
        label: "Aspectos de la vida laboral",
        column_name: "aspects_of_working_life",
        type: "text",
      },
      {
        label: "Relación con la autoridad",
        column_name: "relationship_with_authority",
        type: "text",
      },
      {
        label: "Control de Impulsos",
        column_name: "impulse_control",
        type: "text",
      },
      {
        label: "Manejo de frustración en su vida",
        column_name: "managing_frustration",
        type: "text",
      },
    ],
    //component: <AntecedentesPsiquiatricosForm />,
  },
  {
    label: "DIETA NUTRIOLÓGICA",
    open_menu: false,
    column_name: "nutritional_diet",
    form_options: [
      {
        label: "Desayuno",
        column_name: "breakfast",
        type: "check",
      },
      {
        label: "Colación en la mañana",
        column_name: "snack_in_the_morning",
        type: "check",
      },
      {
        label: "Comida",
        column_name: "meal",
        type: "check",
      },
      {
        label: "Colación en la tarde",
        column_name: "afternoon_snack",
        type: "check",
      },
      {
        label: "Cena",
        column_name: "dinner",
        type: "check",
      },
      {
        label: "Alimentos preparados en casa?",
        column_name: "food_prepared_at_home",
        type: "check",
      },
      {
        label: "Nivel de apetito",
        column_name: "appetite_level",
        type: "select",
        options: ["Excesivo", "Bueno", "Regular", "Poco", "Nulo"],
      },
      {
        label: "Presencia de hambre-saciedad",
        column_name: "hunger_satiety",
        type: "check",
      },
      {
        label: "Vasos de agua al dia",
        column_name: "water_glasses",
        type: "select",
        options: ["1 o menos", "2 a 3", "4 o mas"],
      },
      {
        label: "Preferencias de alimentos",
        column_name: "food_preference",
        type: "text",
      },
      {
        label: "Malestares por alimentos",
        column_name: "food_discomfort",
        type: "check",
      },
      {
        label: "Medicamentos, complementos o suplementos",
        column_name: "medications_supplements",
        type: "check",
      },
      {
        label: "Otras dietas realizadas",
        column_name: "other_diets_carried_out",
        type: "check",
      },
      {
        label: "Peso ideal",
        column_name: "ideal_weight",
        type: "text",
      },
      {
        label: "Padecimiento Actual relacionado al peso",
        column_name: "current_weight_related_condition",
        type: "check",
      },
      {
        label: "Antecedentes personales relacionados al peso",
        column_name: "history_related_to_weight",
        type: "check",
      },
      {
        label: "Consumo de líquidos",
        column_name: "liquid_consumption",
        type: "check",
      },
      {
        label: "Educación nutriológica",
        column_name: "nutrition_education",
        type: "check",
      },
      {
        label: "Otros",
        column_name: "others",
        type: "check",
      },
    ],
    //component: <DietaNutriologicaForm />,
  },
];
