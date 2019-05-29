enum SoundRole { Designer = "Sound Designer", Operator = "Sound Operator", Crew = "Sound Crew" }
enum LightingRole { Designer = "Lighting Designer", Operator = "Lighting Operator", Crew = "Lighting Crew" }
enum StageRole { Manager = "Stage Manager", DeputyManager = "Deputy Stage Manager", Crew = "Stage Crew" }
enum CostumeRole { Crew = "Costume Crew" }
export type Role = SoundRole | LightingRole | StageRole | CostumeRole;
export let Role = {
    Sound: SoundRole,
    Lighting: LightingRole,
    Stage: StageRole,
    Costume: CostumeRole 
}

export type PlayRoles = { [key in Role]?: string }

export class Play {
    constructor(
        public name: string,
        public week: string,
        public type: string,
        public venue: string,
        public playwright: string,
        public director: string,
        public roles: PlayRoles) {}

    

    static fromRow(row: string[]) : Play {
        var roles = {
            [Role.Stage.Manager]: row[7],
            [Role.Stage.DeputyManager]: row[8],
            [Role.Stage.Crew]: row[9],
            [Role.Lighting.Designer]: row[10],
            [Role.Lighting.Operator]: row[11],
            [Role.Lighting.Crew]: row[12],
            [Role.Sound.Designer]: row[13],
            [Role.Sound.Operator]: row[14],
            [Role.Sound.Crew]: row[15]
        }
        return new Play(row[0], row[1], row[2], row[3], row[4], row[5], roles);
    }
}