class Attack {
  constructor(
    name,
    damage,
    defenseStat = "defense" | "specDefense",
    projectile = { key: "none", speed: 300 | 400 | 600 }
  ) {
    this.name = name;
    this.damage = damage;
    this.defenseStat = defenseStat;
    this.projectile = projectile;
  }
}
