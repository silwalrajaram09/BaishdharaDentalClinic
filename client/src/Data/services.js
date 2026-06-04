import cosmetic from "../assets/images/cosmetic dentistry.PNG";
import braces from "../assets/images/braces and aligners.png";
import crownBridges from "../assets/images/crown bridges and dentures.png";
import dentalImplants from "../assets/images/dental implants.png";
import emergencyCare from "../assets/images/emergency dental care.png";
import genralDentistry from "../assets/images/general dentistry.png";
import gumTreatment from "../assets/images/gum treatment.png";
import rootCanal from "../assets/images/root canal treatment.png";
import pediatricDentistry from "../assets/images/pediatric dentistry.png";
import toothExtraction from "../assets/images/tooth extraction and oral surgery.png";

export const services = [
  {
    id: 1,
    title: "General Dentistry",
    heroImage: genralDentistry,
    slug: "general-dentistry",
    objectPos: "center center",
    intro:
      "Routine checkups, cleanings, fillings, and X-rays to keep your smile healthy and catch problems early.",
    procedures: [
      "Dental checkups",
      "Teeth cleaning",
      "Fillings",
      "Fluoride application",
      "Digital X-rays",
    ],
    why: "Essential for prevention, early diagnosis, and maintenance of oral health.",
    when: "Every 6 months or when experiencing dental issues.",
    forWhom: "Everyone, including children and adults seeking preventive care.",
    benefits: [
      "Maintains oral hygiene",
      "Detects problems early",
      "Prevents decay or gum disease",
    ],
  },
  {
    id: 2,
    title: "Root Canal Treatment",
    heroImage: rootCanal,
    slug: "root-canal-treatment",
    objectPos: "center center",
    intro:
      "Infected pulp removal, canal cleaning, and crown restoration to save your natural tooth and relieve pain.",
    procedures: [
      "Removal of infected pulp",
      "Cleaning root canals",
      "Sealing",
      "Restoring with a crown",
    ],
    why: "Removes infection from inside the tooth to preserve it.",
    when: "When tooth decay reaches the pulp, causing pain or swelling.",
    forWhom:
      "Patients with deep decay, tooth infection, or trauma to the tooth.",
    benefits: ["Saves natural tooth", "Relieves pain", "Prevents extraction"],
  },
  {
    id: 3,
    title: "Pediatric Dentistry",
    heroImage: pediatricDentistry,
    slug: "pediatric-dentistry",
    objectPos: "center center",
    intro:
      "Child-focused dental care from first tooth to adolescence — promoting healthy growth and positive habits.",
    procedures: [
      "Fillings",
      "Pulpectomy",
      "Fluoride therapy",
      "Space maintainers",
      "Extractions",
    ],
    why: "Promotes healthy dental growth and prevents decay in children.",
    when: "From first tooth eruption to adolescence for preventive and corrective care.",
    forWhom: "Children from infancy to adolescence requiring dental care.",
    benefits: [
      "Prevents early tooth loss",
      "Guides proper dental development",
      "Builds positive dental habits",
    ],
  },
  {
    id: 4,
    title: "Gum Treatment",
    heroImage: gumTreatment,
    slug: "gum-treatment",
    objectPos: "center center",
    intro:
      "Scaling, root planing, and surgical care to treat gum infection and protect the foundation of your teeth.",
    procedures: [
      "Scaling",
      "Root planing",
      "Flap surgery",
      "Gum care education",
    ],
    why: "Treats infection and inflammation of gums to protect supporting structures.",
    when: "When gums bleed, swell, or show signs of infection.",
    forWhom: "Patients with bleeding gums, bad breath, or loose teeth.",
    benefits: [
      "Controls gum disease",
      "Prevents tooth loss",
      "Improves oral hygiene",
    ],
  },
  {
    id: 5,
    title: "Tooth Extraction & Oral Surgery",
    heroImage: toothExtraction,
    slug: "tooth-extraction-oral-surgery",
    objectPos: "center center",
    intro:
      "Safe removal of damaged, impacted, or overcrowded teeth including wisdom teeth to restore comfort.",
    procedures: [
      "Simple or surgical removal of damaged or impacted teeth",
      "Wisdom tooth removal",
    ],
    why: "Removes problematic teeth to maintain oral health and comfort.",
    when: "When teeth are severely damaged, impacted, or causing overcrowding.",
    forWhom:
      "Patients with severely damaged teeth, crowding, or wisdom tooth problems.",
    benefits: [
      "Relieves pain",
      "Prevents spread of infection",
      "Creates space for orthodontic treatment",
    ],
  },
  {
    id: 6,
    title: "Braces & Aligners",
    heroImage: braces,
    slug: "braces-aligners",
    objectPos: "center center",
    intro:
      "Metal braces, ceramic braces, and clear aligners to straighten teeth and correct bite issues at any age.",
    procedures: [
      "Metal or ceramic braces",
      "Clear aligners",
      "Retainers",
      "Jaw growth appliances",
    ],
    why: "Corrects misaligned teeth and jaw for function and aesthetics.",
    when: "In cases of crooked teeth, bite problems, or gaps.",
    forWhom:
      "Teenagers and adults with misaligned teeth, crowding, or bite issues.",
    benefits: [
      "Straightens teeth",
      "Improves bite and appearance",
      "Enhances oral function",
    ],
  },
  {
    id: 7,
    title: "Crowns, Bridges & Dentures",
    heroImage: crownBridges,
    slug: "crowns-bridges-dentures",
    objectPos: "center center",
    intro:
      "Custom crowns, fixed bridges, and full or partial dentures to restore missing or damaged teeth.",
    procedures: [
      "Placement of crowns",
      "Fixed bridges",
      "Full or partial dentures",
    ],
    why: "Replaces or repairs missing or damaged teeth for function and appearance.",
    when: "When teeth are broken, missing, or severely decayed.",
    forWhom: "Patients with missing, broken, or severely decayed teeth.",
    benefits: [
      "Restores chewing ability",
      "Maintains facial structure",
      "Improves aesthetics",
    ],
  },
  {
    id: 8,
    title: "Dental Implants",
    heroImage: dentalImplants,
    slug: "dental-implants",
    objectPos: "center center",
    intro:
      "Permanent titanium implants with crown restoration for a natural-looking, long-lasting tooth replacement.",
    procedures: [
      "Implant placement",
      "Bone grafting",
      "Sinus lift",
      "Final crown restoration",
    ],
    why: "Provides a fixed, long-term solution for missing teeth.",
    when: "After tooth loss in patients with good bone health.",
    forWhom: "Adults with one or more missing teeth and healthy bone support.",
    benefits: [
      "Permanent tooth replacement",
      "Strong bite",
      "Natural appearance",
    ],
  },
  {
    id: 9,
    title: "Cosmetic Dentistry",
    heroImage: cosmetic,
    slug: "cosmetic-dentistry",
    objectPos: "center center",
    intro:
      "Whitening, smile design, and composite bonding to enhance your smile and boost your confidence.",
    procedures: [
      "Teeth whitening",
      "Smile design",
      "Composite bonding",
      "Aesthetic restorations",
    ],
    why: "Improves overall appearance of teeth and gums.",
    when: "For stained, chipped, or uneven teeth or before special events.",
    forWhom:
      "Individuals seeking to improve the appearance of their teeth and smile.",
    benefits: [
      "Enhances smile",
      "Boosts confidence",
      "Corrects minor imperfections",
    ],
  },
  {
    id: 10,
    title: "Emergency Dental Care",
    heroImage: emergencyCare,
    slug: "emergency-dental-care",
    objectPos: "center center",
    intro:
      "Urgent pain relief, infection control, and trauma care to address dental emergencies when you need it most.",
    procedures: [
      "Pain relief",
      "Infection management",
      "Trauma care",
      "Temporary restorations",
    ],
    why: "Provides urgent treatment to prevent worsening of dental emergencies.",
    when: "During sudden dental pain, swelling, injury, or broken teeth.",
    forWhom:
      "Patients with sudden dental pain, swelling, injury, or broken teeth.",
    benefits: ["Immediate care reduces complications and discomfort"],
  },
];

export default services;
