namespace SpriteKind {
    export const Text = SpriteKind.create()
    export const Sun = SpriteKind.create()
    export const Card = SpriteKind.create()
    export const Plant = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const Other = SpriteKind.create()
}
function create_plant (bite_number: number, mySprite: Sprite, who: Sprite) {
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . f f 1 1 f f f . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . f f 1 1 1 1 1 f . . . . . 
        . . . f 1 1 1 1 1 f f . . . . . 
        . . . f 1 1 1 1 1 f . . . . . . 
        . . . . f f 1 1 1 f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Plant)
    mySprite2.setPosition(mySprite.x, mySprite.y)
    sprites.setDataNumber(mySprite2, "Live", bite_number)
    sprites.setDataNumber(mySprite2, "Type", sprites.readDataNumber(who, "Type"))
    sprites.setDataBoolean(mySprite2, "Planted", false)
    timer.background(function () {
        pauseUntil(() => !(controller.A.isPressed()))
        if (mySprite.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
            sprites.setDataBoolean(mySprite2, "Planted", true)
            tiles.placeOnTile(mySprite2, tiles.getTileLocation(tiles.locationXY(tiles.locationOfSprite(mySprite), tiles.XY.column), tiles.locationXY(tiles.locationOfSprite(mySprite), tiles.XY.row)))
            tiles.setTileAt(tiles.getTileLocation(tiles.locationXY(tiles.locationOfSprite(Tilegrid), tiles.XY.column), tiles.locationXY(tiles.locationOfSprite(Tilegrid), tiles.XY.row)), assets.tile`myTile6`)
            for (let index = 0; index < 2; index++) {
                music.play(music.createSoundEffect(WaveShape.Square, 1087, 1, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            }
            suns += 0 - sprites.readDataNumber(who, "Suns")
            for (let value of sprites.allOfKind(SpriteKind.Text)) {
                sprites.destroy(value)
                score_spawn("" + suns, 50, 9, "Suns")
            }
        } else {
            sprites.setDataBoolean(mySprite2, "Planted", false)
            sprites.destroy(mySprite2)
            for (let index = 0; index < 2; index++) {
                timer.background(function () {
                    music.play(music.createSoundEffect(WaveShape.Square, 200, 190, 255, 93, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                    pause(50)
                })
            }
        }
        grabbing_plant = false
    })
    plant_attacksuses(mySprite2)
}
function create_zombie (num: number) {
    zombie = sprites.create(img`
        ............ff..
        ..........ff55f.
        .........f5555f.
        ........f55555f.
        ......ff55555f..
        ...ffff555555f..
        .f.f55fff55fff..
        ..fff5555ffff...
        .f999ff5555ff...
        f999999fff55ff..
        fff999f11fffff..
        f11f99f1f1f9f...
        ff1f99f111f9f...
        f11f999fff99f...
        fff999999999f...
        .f9ffff999ff....
        .f91ff19ffccff..
        ..ffffff44ccccf.
        .....ff644cfcccf
        ....fcf644cfcfcf
        ....fcf64ccfcfcf
        ....fcfccccfcfcf
        ....f9ff888f998f
        ....fffffffffff.
        ......fbbbfbbbf.
        `, SpriteKind.Enemy)
    zombie.vx = -2
    tiles.placeOnTile(zombie, tiles.getTileLocation(11, randint(2, 6)))
    sprites.setDataNumber(zombie, "Type", num)
    zombie.y += -3
    if (sprites.readDataNumber(zombie, "Type") == 1) {
        sprites.setDataNumber(zombie, "Live", 10)
    } else if (sprites.readDataNumber(zombie, "Type") == 2) {
        sprites.setDataNumber(zombie, "Live", 18)
    }
    animation.runImageAnimation(
    zombie,
    [img`
        ................
        ................
        ................
        ................
        .......f........
        ......f.........
        .f..fffff..f....
        ..ffbbbbbff.f...
        .fbbbbbbbbbf....
        fbbbbbbfffbbf...
        fffbbbf111fbf...
        f11fbbf1f1fbf...
        ff1fbbf111fbf...
        f11fbbbfffbbf...
        fffbbbbbbbbbf...
        .fbffffbbbff....
        .fb1ff1bffeeff..
        ..ffffff11eeeef.
        .....ff211efeeef
        ....fef211efefef
        ....fef21eefefef
        ....fefeeeefefef
        ....fbff888fbb8f
        ....fffffffffff.
        ......feeefeeef.
        `,img`
        ................
        ................
        ................
        .......f........
        ......f.........
        .f..fffff..f....
        ..ffbbbbbff.f...
        .fbbbbbbbbbf....
        fbbbbbbfffbbf...
        fffbbbf111fbf...
        f11fbbf1f1fbf...
        ff1fbbf111fbf...
        f11fbbbfffbbf...
        fffbbbbbbbbbf...
        .fbffffbbbff....
        .fb1ff1bffeef...
        ..ffffff11eeeff.
        .....fff11efeeef
        .....ff221efeeef
        ....fefe22eeffef
        ...feefee2eeefbb
        ...fbffeeee888ff
        ...ff.ff8888888f
        ......fffffffff.
        .....feeef.feeef
        `,img`
        ................
        ................
        ................
        ................
        .......f........
        ......f.........
        .f..fffff..f....
        ..ffbbbbbff.f...
        .fbbbbbbbbbf....
        fbbbbbbfffbbf...
        fffbbbf111fbf...
        f11fbbf1f1fbf...
        ff1fbbf111fbf...
        f11fbbbfffbbf...
        fffbbbbbbbbbf...
        .fbffffbbbff....
        .fb1ff1bffeeff..
        ..ffffff11eeeef.
        .....ff211efeeef
        ....fef211efefef
        ....fef21eefefef
        ....fefeeeefefef
        ....fbff888fbb8f
        ....fffffffffff.
        ......feeefeeef.
        `,img`
        ................
        ................
        ................
        .......f........
        ......f.........
        .f..fffff..f....
        ..ffbbbbbff.f...
        .fbbbbbbbbbf....
        fbbbbbbfffbbf...
        fffbbbf111fbf...
        f11fbbf1f1fbf...
        ff1fbbf111fbf...
        f11fbbbfffbbf...
        fffbbbbbbbbbf...
        .fbffffbbbff....
        .fb1ff1bffeef...
        ..ffffff11eeef..
        ......ff1feeef..
        ......f21fefeef.
        ......f2ffefeef.
        ......f2fbbeeef.
        ......feeeeee8f.
        ......ff888888f.
        ......fffffffff.
        .......fefeeef..
        `],
    1000,
    true
    )
}
sprites.onDestroyed(SpriteKind.Sun, function (sprite) {
    sun_sprite_counter += -1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(click)) {
        click = true
        mySprite.scale = 0.8
        timer.after(50, function () {
            click = false
            mySprite.scale = 1
        })
    }
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile5`, function (sprite, location) {
    game.gameOver(false)
})
function load_plant_bar () {
    create_plant_card(15, 1)
    create_plant_card(40, 2)
    create_plant_card(65, 0)
    create_plant_card(90, 0)
    create_plant_card(115, 0)
}
spriteutils.createRenderable(90, function (screen2) {
    screen2.fillRect(0, 0, 200, 10, 15)
    spriteutils.drawTransparentImage(img`
        5 5 . 5 5 5 . 5 5 
        5 . f f f f f . 5 
        . f 5 5 5 5 5 f . 
        5 f 5 5 5 5 5 f 5 
        5 f 5 5 5 5 5 f 5 
        5 f 5 5 5 5 5 f 5 
        . f 5 5 5 5 5 f . 
        5 . f f f f f . 5 
        5 5 . 5 5 5 . 5 5 
        `, screen2, 1, 0)
    screen2.fillRect(128, 132, zombie_attack_time / 4, 10, 2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Sun, function (sprite, otherSprite) {
    if (click) {
        if (!(grabbing_plant)) {
            sprites.destroy(otherSprite)
            suns += 25
            for (let index = 0; index < 4; index++) {
                music.play(music.createSoundEffect(WaveShape.Sine, 283, 747, 255, 102, 300, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            }
            extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Electric, ExtraEffectPresetShape.Twinkle), 200, 25, 10)
            for (let value3 of sprites.allOfKind(SpriteKind.Text)) {
                sprites.destroy(value3)
                score_spawn("" + suns, 50, 9, "Suns")
                if (suns >= 9999) {
                    suns = 9999
                }
            }
        }
    }
})
sprites.onCreated(SpriteKind.Sun, function (sprite) {
    sun_sprite_counter += 1
    sprite.lifespan = 5000
    animation.runImageAnimation(
    sprite,
    [img`
        5 5 . 5 5 5 . 5 5 
        5 . f f f f f . 5 
        . f 5 5 5 5 5 f . 
        5 f 5 5 5 5 5 f 5 
        5 f 5 5 5 5 5 f 5 
        5 f 5 5 5 5 5 f 5 
        . f 5 5 5 5 5 f . 
        5 . f f f f f . 5 
        5 5 . 5 5 5 . 5 5 
        `,img`
        1 1 . 1 1 1 . 1 1 
        1 . f f f f f . 1 
        . f 1 1 1 1 1 f . 
        1 f 1 1 1 1 1 f 1 
        1 f 1 1 1 1 1 f 1 
        1 f 1 1 1 1 1 f 1 
        . f 1 1 1 1 1 f . 
        1 . f f f f f . 1 
        1 1 . 1 1 1 . 1 1 
        `,img`
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        . . . . . . . . . 
        `],
    50,
    true
    )
    if (sun_sprite_counter >= 5) {
        sprites.destroy(sprite)
    }
})
function plant_attacksuses (plant: Sprite) {
    if (sprites.readDataNumber(plant, "Type") == 1) {
        animation.runImageAnimation(
        plant,
        [img`
            . . . . f f f f f f f f f . . . 
            . . f f 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 f f f f f f 5 5 f . . 
            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
            . f 5 f 4 f 4 4 4 4 f 4 f 5 f . 
            f 5 5 f 4 f 4 4 4 4 f 4 f 5 f . 
            . f 5 f 4 4 e 4 4 e 4 4 f 5 f . 
            . f 5 f 4 4 e e e e 4 4 f 5 5 f 
            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
            . . f 5 5 f f f f f f 5 5 f . . 
            . . . f 5 5 5 5 5 5 5 5 f f . . 
            . . . . f f f f f f f f . . . . 
            . . . . . . f 7 f . . . . . . . 
            . . . f f f f 7 f f f f . . . . 
            . . f 7 7 7 f f 7 7 7 7 f . . . 
            . f f f f f f f f f f f f f . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . f f 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 f f f f f f 5 5 f . . 
            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
            . f 5 f 4 f 4 4 4 4 f 4 f 5 f . 
            f 5 5 f 4 f 4 4 4 4 f 4 f 5 f . 
            . f 5 f 4 4 e 4 4 e 4 4 f 5 f . 
            . f 5 f 4 4 e e e e 4 4 f 5 5 f 
            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
            . . f 5 5 f f f f f f 5 5 f . . 
            . . . f 5 5 5 5 5 5 5 5 f f . . 
            . . . . f f f f f f f f . . . . 
            . . . f f f f 7 f f f f . . . . 
            . . f 7 7 7 f f 7 7 7 7 f . . . 
            . f f f f f f f f f f f f f . . 
            `],
        500,
        true
        )
        spriteutils.onSpriteUpdateInterval(plant, 10000, function (sprite) {
            if (!(spriteutils.isDestroyed(sprite)) && sprites.readDataBoolean(sprite, "Planted")) {
                timer.after(randint(0, 500), function () {
                    if (Math.percentChance(70)) {
                        animation.runImageAnimation(
                        sprite,
                        [img`
                            . . . . f f f f f f f f f . . . 
                            . . f f 5 5 5 5 5 5 5 5 5 f . . 
                            . . f 5 5 f f f f f f 5 5 f . . 
                            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                            . f 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                            f 5 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                            . f 5 f 4 4 e 4 4 e 4 4 f 5 f . 
                            . f 5 f 4 4 e e e e 4 4 f 5 5 f 
                            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                            . . f 5 5 f f f f f f 5 5 f . . 
                            . . . f 5 5 5 5 5 5 5 5 f f . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . f 7 f . . . . . . . 
                            . . . f f f f 7 f f f f . . . . 
                            . . f 7 7 7 f f 7 7 7 7 f . . . 
                            . f f f f f f f f f f f f f . . 
                            `,img`
                            . . . . f f f f f f f f f . . . 
                            . . f f 1 1 1 1 1 1 1 1 1 f . . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . f 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            f 1 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . . . f 1 1 1 1 1 1 1 1 f f . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . f 1 f . . . . . . . 
                            . . . f f f f 1 f f f f . . . . 
                            . . f 1 1 1 f f 1 1 1 1 f . . . 
                            . f f f f f f f f f f f f f . . 
                            `,img`
                            . . . . f f f f f f f f f . . . 
                            . . f f 1 1 1 1 1 1 1 1 1 f . . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . f 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            f 1 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . . . f 1 1 1 1 1 1 1 1 f f . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . f 1 f . . . . . . . 
                            . . . f f f f 1 f f f f . . . . 
                            . . f 1 1 1 f f 1 1 1 1 f . . . 
                            . f f f f f f f f f f f f f . . 
                            `,img`
                            . . . . 1 1 1 1 1 1 1 1 1 . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . . 1 1 1 1 1 1 1 1 . . . . 
                            . . . . . . 1 1 1 . . . . . . . 
                            . . . 1 1 1 1 1 1 1 1 1 . . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            `,img`
                            . . . . 1 1 1 1 1 1 1 1 1 . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . . 1 1 1 1 1 1 1 1 . . . . 
                            . . . . . . 1 1 1 . . . . . . . 
                            . . . 1 1 1 1 1 1 1 1 1 . . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            `,img`
                            . . . . 1 1 1 1 1 1 1 1 1 . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . . 1 1 1 1 1 1 1 1 . . . . 
                            . . . . . . 1 1 1 . . . . . . . 
                            . . . 1 1 1 1 1 1 1 1 1 . . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            `,img`
                            . . . . 1 1 1 1 1 1 1 1 1 . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . . 1 1 1 1 1 1 1 1 . . . . 
                            . . . . . . 1 1 1 . . . . . . . 
                            . . . 1 1 1 1 1 1 1 1 1 . . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                            `,img`
                            . . . . f f f f f f f f f . . . 
                            . . f f 1 1 1 1 1 1 1 1 1 f . . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . f 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            f 1 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . . . f 1 1 1 1 1 1 1 1 f f . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . f 1 f . . . . . . . 
                            . . . f f f f 1 f f f f . . . . 
                            . . f 1 1 1 f f 1 1 1 1 f . . . 
                            . f f f f f f f f f f f f f . . 
                            `,img`
                            . . . . f f f f f f f f f . . . 
                            . . f f 1 1 1 1 1 1 1 1 1 f . . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . f 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            f 1 1 f 1 f 1 1 1 1 f 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 f . 
                            . f 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
                            . f 1 1 f 1 1 1 1 1 1 f 1 1 f . 
                            . . f 1 1 f f f f f f 1 1 f . . 
                            . . . f 1 1 1 1 1 1 1 1 f f . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . f 1 f . . . . . . . 
                            . . . f f f f 1 f f f f . . . . 
                            . . f 1 1 1 f f 1 1 1 1 f . . . 
                            . f f f f f f f f f f f f f . . 
                            `,img`
                            . . . . f f f f f f f f f . . . 
                            . . f f 5 5 5 5 5 5 5 5 5 f . . 
                            . . f 5 5 f f f f f f 5 5 f . . 
                            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                            . f 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                            f 5 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                            . f 5 f 4 4 e 4 4 e 4 4 f 5 f . 
                            . f 5 f 4 4 e e e e 4 4 f 5 5 f 
                            . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                            . . f 5 5 f f f f f f 5 5 f . . 
                            . . . f 5 5 5 5 5 5 5 5 f f . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . f 7 f . . . . . . . 
                            . . . f f f f 7 f f f f . . . . 
                            . . f 7 7 7 f f 7 7 7 7 f . . . 
                            . f f f f f f f f f f f f f . . 
                            `],
                        100,
                        false
                        )
                        timer.after(500, function () {
                            sun = sprites.create(img`
                                1 1 . 1 1 1 . 1 1 
                                1 . f f f f f . 1 
                                . f 3 3 3 3 3 f . 
                                1 f 3 3 3 3 3 f 1 
                                1 f 3 3 3 3 3 f 1 
                                1 f 3 3 3 3 3 f 1 
                                . f 3 3 3 3 3 f . 
                                1 . f f f f f . 1 
                                1 1 . 1 1 1 . 1 1 
                                `, SpriteKind.Sun)
                            sun.setPosition(sprite.x, sprite.y)
                            timer.after(500, function () {
                                animation.runImageAnimation(
                                sprite,
                                [img`
                                    . . . . f f f f f f f f f . . . 
                                    . . f f 5 5 5 5 5 5 5 5 5 f . . 
                                    . . f 5 5 f f f f f f 5 5 f . . 
                                    . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                                    . f 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                                    f 5 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                                    . f 5 f 4 4 e 4 4 e 4 4 f 5 f . 
                                    . f 5 f 4 4 e e e e 4 4 f 5 5 f 
                                    . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                                    . . f 5 5 f f f f f f 5 5 f . . 
                                    . . . f 5 5 5 5 5 5 5 5 f f . . 
                                    . . . . f f f f f f f f . . . . 
                                    . . . . . . f 7 f . . . . . . . 
                                    . . . f f f f 7 f f f f . . . . 
                                    . . f 7 7 7 f f 7 7 7 7 f . . . 
                                    . f f f f f f f f f f f f f . . 
                                    `,img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . f f f f f f f f f . . . 
                                    . . f f 5 5 5 5 5 5 5 5 5 f . . 
                                    . . f 5 5 f f f f f f 5 5 f . . 
                                    . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                                    . f 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                                    f 5 5 f 4 f 4 4 4 4 f 4 f 5 f . 
                                    . f 5 f 4 4 e 4 4 e 4 4 f 5 f . 
                                    . f 5 f 4 4 e e e e 4 4 f 5 5 f 
                                    . f 5 5 f 4 4 4 4 4 4 f 5 5 f . 
                                    . . f 5 5 f f f f f f 5 5 f . . 
                                    . . . f 5 5 5 5 5 5 5 5 f f . . 
                                    . . . . f f f f f f f f . . . . 
                                    . . . f f f f 7 f f f f . . . . 
                                    . . f 7 7 7 f f 7 7 7 7 f . . . 
                                    . f f f f f f f f f f f f f . . 
                                    `],
                                500,
                                true
                                )
                            })
                        })
                    }
                })
            } else {
            	
            }
        })
    } else if (sprites.readDataNumber(plant, "Type") == 2) {
        animation.runImageAnimation(
        plant,
        [img`
            . f f . f f f f f f . . . . . . 
            f 6 6 f 7 7 7 7 7 7 f . . . . . 
            f 6 f 7 7 7 7 7 7 7 7 f . . . . 
            f 6 f 7 7 1 f f 7 7 f f f f . . 
            f 6 f 7 7 f f f 7 f f 7 6 f f . 
            f f f 7 7 f f f 7 f 7 f f 6 f . 
            f . f 7 7 7 7 7 7 f 7 f f 6 f . 
            . . f 7 7 7 7 7 7 f 7 f f 6 f . 
            . . . f 7 7 7 7 7 f 7 f f 6 f . 
            . . . . f f f f f f f 7 6 f f . 
            . . . . . . f 7 f . f f f f . . 
            . . . . . . f 7 f . . . . . . . 
            . . . . . . f 7 f . . . . . . . 
            . . . . f f f 7 f f f f f . . . 
            . . . f 6 6 6 f f 6 6 6 6 f . . 
            . . f f f f f f f f f f f f f . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . f f . f f f f f f . . . . . . 
            f 6 6 f 7 7 7 7 7 7 f . . . . . 
            f 6 f 7 7 7 7 7 7 7 7 f . . . . 
            f 6 f 7 7 1 f f 7 7 f f f f . . 
            f 6 f 7 7 f f f 7 f f 7 6 f f . 
            f f f 7 7 f f f 7 f 7 f f 6 f . 
            f . f 7 7 7 7 7 7 f 7 f f 6 f . 
            . . f 7 7 7 7 7 7 f 7 f f 6 f . 
            . . . f 7 7 7 7 7 f 7 f f 6 f . 
            . . . . f f f f f f f 7 6 f f . 
            . . . . . . f 7 f . f f f f . . 
            . . . . f . f 7 f . . . f . . . 
            . . . f 6 f f 7 f f f f 6 f . . 
            . . f f f 6 6 f f 6 6 6 f f f . 
            . . . . . f f f f f f f . . . . 
            `],
        500,
        true
        )
        spriteutils.onSpriteUpdateInterval(plant, 1500, function (sprite) {
            timer.after(randint(0, 500), function () {
                for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
                    if (!(spriteutils.isDestroyed(sprite)) && sprites.readDataBoolean(sprite, "Planted")) {
                        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row) == tiles.locationXY(tiles.locationOfSprite(value2), tiles.XY.row)) {
                            projectile = sprites.createProjectileFromSprite(img`
                                . f f f f f . . 
                                f 7 7 7 7 7 f . 
                                f 7 7 7 7 7 f . 
                                f 7 7 7 7 7 f . 
                                f 7 7 7 7 7 f . 
                                f 7 7 7 7 7 f . 
                                . f f f f f . . 
                                . . . . . . . . 
                                `, sprite, 50, 0)
                            projectile.z = -1
                            for (let index = 0; index < 4; index++) {
                                music.play(music.createSoundEffect(WaveShape.Noise, 97, 1, 255, 77, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                            }
                            animation.runImageAnimation(
                            sprite,
                            [img`
                                . . f f . f f f f f . . . . . . 
                                . f 6 6 f 7 7 7 7 7 f . . . . . 
                                . f 6 f 7 7 7 7 7 7 7 f . . . . 
                                . f 6 f 7 7 f 7 7 f f f f . . . 
                                . f 6 f 7 7 7 f f f 7 6 f f . . 
                                . f f f 7 7 f f f 7 f f 6 f . . 
                                . f . f 7 7 7 7 f 7 f f 6 f . . 
                                . . . f 7 7 7 7 f 7 f f 6 f . . 
                                . . . . f 7 7 7 f 7 f f 6 f . . 
                                . . . . . f f f f f 7 6 f f . . 
                                . . . . . . f 7 7 f f f f . . . 
                                . . . . . . f 7 f . . . . . . . 
                                . . . . . . f 7 f . . . . . . . 
                                . . . . f f f 7 f f f f f . . . 
                                . . . f 6 6 6 f f 6 6 6 6 f . . 
                                . . f f f f f f f f f f f f f . 
                                `,img`
                                . . . . . . . . . . . . . . . . 
                                . f f . f f f f f f . . . . . . 
                                f 6 6 f 7 7 7 7 7 7 f . . . . . 
                                f 6 f 7 7 7 7 7 7 7 7 f . . . . 
                                f 6 f 7 7 7 7 7 7 7 7 f f f f . 
                                f 6 f 7 7 7 1 f f 7 f f 7 6 f f 
                                f f f 7 7 7 f f f 7 f 7 f f 6 f 
                                f . f 7 7 7 7 7 7 7 f 7 f f 6 f 
                                . . f 7 7 7 7 7 7 7 f 7 f f 6 f 
                                . . . f 7 7 7 7 7 7 f 7 f f 6 f 
                                . . . . f f f f f f f f 7 6 f f 
                                . . . . . . f 7 f . . f f f f . 
                                . . . . . . f 7 f . . . . . . . 
                                . . . . f f f 7 f f f f f . . . 
                                . . . f 6 6 6 f f 6 6 6 6 f . . 
                                . . f f f f f f f f f f f f f . 
                                `,img`
                                . . . . . . . . . . . . . . . . 
                                . f f . f f f f f f . . . . . . 
                                f 6 6 f 7 7 7 7 7 7 f . . . . . 
                                f 6 f 7 7 7 7 7 7 7 7 f . . . . 
                                f 6 f 7 7 1 f f 7 7 f f f f . . 
                                f 6 f 7 7 f f f 7 f f 7 6 f f . 
                                f f f 7 7 f f f 7 f 7 f f 6 f . 
                                f . f 7 7 7 7 7 7 f 7 f f 6 f . 
                                . . f 7 7 7 7 7 7 f 7 f f 6 f . 
                                . . . f 7 7 7 7 7 f 7 f f 6 f . 
                                . . . . f f f f f f f 7 6 f f . 
                                . . . . . . f 7 f . f f f f . . 
                                . . . . . . f 7 f . . . . . . . 
                                . . . . f f f 7 f f f f f . . . 
                                . . . f 6 6 6 f f 6 6 6 6 f . . 
                                . . f f f f f f f f f f f f f . 
                                `],
                            100,
                            false
                            )
                            timer.after(300, function () {
                                animation.runImageAnimation(
                                sprite,
                                [img`
                                    . f f . f f f f f f . . . . . . 
                                    f 6 6 f 7 7 7 7 7 7 f . . . . . 
                                    f 6 f 7 7 7 7 7 7 7 7 f . . . . 
                                    f 6 f 7 7 1 f f 7 7 f f f f . . 
                                    f 6 f 7 7 f f f 7 f f 7 6 f f . 
                                    f f f 7 7 f f f 7 f 7 f f 6 f . 
                                    f . f 7 7 7 7 7 7 f 7 f f 6 f . 
                                    . . f 7 7 7 7 7 7 f 7 f f 6 f . 
                                    . . . f 7 7 7 7 7 f 7 f f 6 f . 
                                    . . . . f f f f f f f 7 6 f f . 
                                    . . . . . . f 7 f . f f f f . . 
                                    . . . . . . f 7 f . . . . . . . 
                                    . . . . . . f 7 f . . . . . . . 
                                    . . . . f f f 7 f f f f f . . . 
                                    . . . f 6 6 6 f f 6 6 6 6 f . . 
                                    . . f f f f f f f f f f f f f . 
                                    `,img`
                                    . . . . . . . . . . . . . . . . 
                                    . f f . f f f f f f . . . . . . 
                                    f 6 6 f 7 7 7 7 7 7 f . . . . . 
                                    f 6 f 7 7 7 7 7 7 7 7 f . . . . 
                                    f 6 f 7 7 1 f f 7 7 f f f f . . 
                                    f 6 f 7 7 f f f 7 f f 7 6 f f . 
                                    f f f 7 7 f f f 7 f 7 f f 6 f . 
                                    f . f 7 7 7 7 7 7 f 7 f f 6 f . 
                                    . . f 7 7 7 7 7 7 f 7 f f 6 f . 
                                    . . . f 7 7 7 7 7 f 7 f f 6 f . 
                                    . . . . f f f f f f f 7 6 f f . 
                                    . . . . . . f 7 f . f f f f . . 
                                    . . . . f . f 7 f . . . f . . . 
                                    . . . f 6 f f 7 f f f f 6 f . . 
                                    . . f f f 6 6 f f 6 6 6 f f f . 
                                    . . . . . f f f f f f f . . . . 
                                    `],
                                500,
                                true
                                )
                            })
                        }
                    }
                }
            })
        })
    }
}
function score_spawn (num: string, x: number, y: number, _type: string) {
    numbr_text = image.create(num.length * 16, 16)
    for (let index6 = 0; index6 <= num.length - 1; index6++) {
        index_of_number = get_number_index(num.charAt(index6))
        spriteutils.drawTransparentImage(numbr_font[index_of_number], numbr_text, 8 * index6, 0)
if (!(index_of_number)) {
            spriteutils.drawTransparentImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, numbr_text, 8 * index6, 0)
        }
    }
    numbrs_sprite = sprites.create(numbr_text, SpriteKind.Text)
    numbrs_sprite.z = 100
    numbrs_sprite.setFlag(SpriteFlag.RelativeToCamera, true)
    numbrs_sprite.setPosition(x, y)
}
sprites.onOverlap(SpriteKind.Plant, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(sprite, "Planted")) {
        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row) == tiles.locationXY(tiles.locationOfSprite(otherSprite), tiles.XY.row)) {
            otherSprite.vx = 0
            sprite.setFlag(SpriteFlag.Ghost, true)
            animation.runImageAnimation(
            otherSprite,
            [img`
                ................
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffffffbbbbbf...
                .ff1ff1bbbff....
                .ffffffbffeeff..
                .f7ff7ff11eeeef.
                ..fffff211efeeef
                ....fef211efefef
                ....fef21eefefef
                ....fefeeeefefef
                ....fbff888fbb8f
                ....fffffffffff.
                ......feeefeeef.
                `,img`
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeef...
                ..ffffff11eeef..
                ......ff1feeef..
                ......f21fefeef.
                ......f2ffefeef.
                ......f2fbbeeef.
                ......feeeeee8f.
                ......ff888888f.
                ......fffffffff.
                .......fefeeef..
                `],
            200,
            true
            )
            for (let index = 0; index < 4; index++) {
                music.play(music.createSoundEffect(WaveShape.Noise, 716, 716, 255, 77, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            }
            extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Smoke, ExtraEffectPresetShape.Spark), 200, 25, 10)
            timer.after(500, function () {
                sprite.setFlag(SpriteFlag.Ghost, false)
            })
            sprites.changeDataNumberBy(sprite, "Live", -1)
            if (sprites.readDataNumber(sprite, "Live") <= 0) {
                extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Smoke, ExtraEffectPresetShape.Spark), 500, 25, 15)
                tiles.setTileAt(tiles.getTileLocation(tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.column), tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row)), assets.tile`myTile`)
                sprites.destroy(sprite)
                otherSprite.vx = -3
                animation.runImageAnimation(
                otherSprite,
                [img`
                    ................
                    ................
                    ................
                    ................
                    .......f........
                    ......f.........
                    .f..fffff..f....
                    ..ffbbbbbff.f...
                    .fbbbbbbbbbf....
                    fbbbbbbfffbbf...
                    fffbbbf111fbf...
                    f11fbbf1f1fbf...
                    ff1fbbf111fbf...
                    f11fbbbfffbbf...
                    fffbbbbbbbbbf...
                    .fbffffbbbff....
                    .fb1ff1bffeeff..
                    ..ffffff11eeeef.
                    .....ff211efeeef
                    ....fef211efefef
                    ....fef21eefefef
                    ....fefeeeefefef
                    ....fbff888fbb8f
                    ....fffffffffff.
                    ......feeefeeef.
                    `,img`
                    ................
                    ................
                    ................
                    .......f........
                    ......f.........
                    .f..fffff..f....
                    ..ffbbbbbff.f...
                    .fbbbbbbbbbf....
                    fbbbbbbfffbbf...
                    fffbbbf111fbf...
                    f11fbbf1f1fbf...
                    ff1fbbf111fbf...
                    f11fbbbfffbbf...
                    fffbbbbbbbbbf...
                    .fbffffbbbff....
                    .fb1ff1bffeef...
                    ..ffffff11eeeff.
                    .....fff11efeeef
                    .....ff221efeeef
                    ....fefe22eeffef
                    ...feefee2eeefbb
                    ...fbffeeee888ff
                    ...ff.ff8888888f
                    ......fffffffff.
                    .....feeef.feeef
                    `,img`
                    ................
                    ................
                    ................
                    ................
                    .......f........
                    ......f.........
                    .f..fffff..f....
                    ..ffbbbbbff.f...
                    .fbbbbbbbbbf....
                    fbbbbbbfffbbf...
                    fffbbbf111fbf...
                    f11fbbf1f1fbf...
                    ff1fbbf111fbf...
                    f11fbbbfffbbf...
                    fffbbbbbbbbbf...
                    .fbffffbbbff....
                    .fb1ff1bffeeff..
                    ..ffffff11eeeef.
                    .....ff211efeeef
                    ....fef211efefef
                    ....fef21eefefef
                    ....fefeeeefefef
                    ....fbff888fbb8f
                    ....fffffffffff.
                    ......feeefeeef.
                    `,img`
                    ................
                    ................
                    ................
                    .......f........
                    ......f.........
                    .f..fffff..f....
                    ..ffbbbbbff.f...
                    .fbbbbbbbbbf....
                    fbbbbbbfffbbf...
                    fffbbbf111fbf...
                    f11fbbf1f1fbf...
                    ff1fbbf111fbf...
                    f11fbbbfffbbf...
                    fffbbbbbbbbbf...
                    .fbffffbbbff....
                    .fb1ff1bffeef...
                    ..ffffff11eeef..
                    ......ff1feeef..
                    ......f21fefeef.
                    ......f2ffefeef.
                    ......f2fbbeeef.
                    ......feeeeee8f.
                    ......ff888888f.
                    ......fffffffff.
                    .......fefeeef..
                    `],
                1000,
                true
                )
            }
        }
    }
})
function create_plant_card (x: number, _type: number) {
    plant_card = sprites.create(img`
        ffffffffffffffffffff
        f222222222222222222f
        f222222222222222222f
        f222222222222222222f
        f222222222222222222f
        f222222222222222222f
        f222222222222222222f
        f333333333333333333f
        f333333333333333333f
        f333333333333333333f
        f333333333333333333f
        ffffffffffffffffffff
        f111111111111111111f
        f111111111111111111f
        f111111111111111111f
        f111111111111111111f
        f111111111111111111f
        f111111111111111111f
        f111111111111111111f
        ffffffffffffffffffff
        `, SpriteKind.Card)
    sprites.setDataNumber(plant_card, "Type", _type)
    plant_card.setPosition(x, 140)
    sprites.setDataBoolean(plant_card, "On?", true)
    if (sprites.readDataNumber(plant_card, "Type") == 0) {
        sprites.destroy(plant_card)
    } else if (sprites.readDataNumber(plant_card, "Type") == 1) {
        sprites.setDataNumber(plant_card, "Cooldown", 6000)
        sprites.setDataNumber(plant_card, "Suns", 50)
        plant_card.setImage(img`
            ffffffffffffffffffff
            f111ff555555555f111f
            f111f55ffffff55f111f
            f11f55f444444f55f11f
            f11f5f44444444f5f11f
            f1f55fff4444fff5f11f
            f11f5f4e4444e4f5f11f
            f11f5f44eeee44f55f1f
            f11f55f444444f55f11f
            f111f55ffffff55f111f
            f1111f55555555ff111f
            ffffffffffffffffffff
            f1111fff1111fffff11f
            f111f11ff11ff111ff1f
            f11ff111ff11111fff1f
            f11ff111ff111ffff11f
            f11ff111ff11ffff111f
            f111ff11f11fff11111f
            f1111fff111fffffff1f
            ffffffffffffffffffff
            `)
    } else if (sprites.readDataNumber(plant_card, "Type") == 2) {
        sprites.setDataNumber(plant_card, "Cooldown", 9000)
        sprites.setDataNumber(plant_card, "Suns", 100)
        plant_card.setImage(img`
            ffffffffffffffffffff
            f11ff1ffffff1111111f
            f1f66f777777f111111f
            f1f6f77777777f11111f
            f1f6f771ff77ffff111f
            f1f6f77fff7ff76ff11f
            f1fff77fff7f7ff6f11f
            f1f1f777777f7ff6f11f
            f111f777777f7ff6f11f
            f1111f77777f7ff6f11f
            f11111fffffff76f111f
            ffffffffffffffffffff
            f1111fff111111fff11f
            f111f11ff1111ffff11f
            f11ff111ff11ff1ff11f
            f11ff111ff1ff11ff11f
            f11ff111ff1fffffff1f
            f111ff11f111111ff11f
            f1111fff1111111ff11f
            ffffffffffffffffffff
            `)
    } else {
    	
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Card, function (sprite, otherSprite) {
    if (!(grabbing_plant)) {
        if (click) {
            if (suns >= sprites.readDataNumber(otherSprite, "Suns")) {
                if (Tilegrid.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
                    sprites.setDataBoolean(otherSprite, "On?", false)
                    otherSprite.setFlag(SpriteFlag.Ghost, true)
                    create_plant(4, mySprite, otherSprite)
                    timer.after(sprites.readDataNumber(otherSprite, "Cooldown"), function () {
                        sprites.setDataBoolean(otherSprite, "On?", true)
                        otherSprite.setFlag(SpriteFlag.Ghost, false)
                    })
                }
            }
        }
    }
})
function zombie_spawning_system () {
    zombie_spawn_random_num = randint(1, 2)
    create_zombie(zombie_spawn_random_num)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(50, function () {
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Toxic, ExtraEffectPresetShape.Spark), 200, 25, 10)
    if (sprites.readDataNumber(otherSprite, "Live") <= 0) {
        otherSprite.vx = 0
        otherSprite.lifespan = 1000
        animation.runImageAnimation(
        otherSprite,
        [img`
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ....22222.......
            ...fffffff......
            ..ffff11eeeff...
            ...fff11efeeef..
            ...ff221efeeef..
            ..fefe22eeffef..
            .feefee2eeefbb..
            .fbffeeee888ff..
            .ff.ff8888888f..
            ....fffffffff...
            ...feeef.feeef..
            `,img`
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ...f2222fff.....
            ..ffffffffef....
            ..ff211efeeef...
            .fef211efefef...
            .fef21eefefef...
            .fefeeeefefef...
            .fbff888fbb8f...
            .fffffffffff....
            ...feeefeeef....
            `,img`
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ...f2222fff.....
            ..ffffffffef....
            ..ff211efeeef...
            .fef211efefef...
            .fef21eefefef...
            .fefeeeefefef...
            .fbff888fee8f...
            ....feeefeeef...
            `,img`
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ....f222ff......
            ...ffffffef.....
            ...ff22eeee.....
            ..fef22eefe.....
            ..fef2eeefe.....
            ..fefeeeefe.....
            ..fbf888bb8f....
            ...fbbbfbbbf....
            `,img`
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ....f222ff......
            ...ffffffef.....
            ...ff22eeee.....
            ..fef22eefe.....
            ..fef2eeefe.....
            ..fefeeeefe.....
            ..f9f888998f....
            ...fbbbfbbbf....
            `,img`
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            ................
            .feeee8.........
            feefffb.........
            fffffffff.......
            2feeee8fe.......
            2f111e8fe.......
            2f222effe.......
            .ffeeeeff.......
            `],
        100,
        false
        )
    }
    sprites.changeDataNumberBy(otherSprite, "Live", -1)
})
function get_number_index (char: string) {
    index_of = "0123456789".indexOf(char)
    return index_of
}
let new_sprite_image_text: Sprite = null
let index_of = 0
let zombie_spawn_random_num = 0
let plant_card: Sprite = null
let numbrs_sprite: Sprite = null
let index_of_number = 0
let numbr_text: Image = null
let projectile: Sprite = null
let sun: Sprite = null
let click = false
let sun_sprite_counter = 0
let zombie: Sprite = null
let grabbing_plant = false
let mySprite2: Sprite = null
let start_zombie_spawn = false
let zombie_attack_time = 0
let suns = 0
let Tilegrid: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    . . . . f f . . . . . . 
    . . . f 1 1 f . . . . . 
    . . . f 1 1 f . . . . . 
    . . . f 1 1 f . . . . . 
    . . . f 1 1 f . . . . . 
    f f f f 1 1 f f f f f . 
    f 1 1 1 f 1 1 f 1 1 f . 
    f 1 1 1 1 1 1 f 1 1 f . 
    . f 1 1 1 1 1 1 1 1 f . 
    . . f 1 1 1 1 1 1 1 f . 
    . . f 1 1 1 1 1 1 1 f . 
    . . . f f f f f f f . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 140, 140)
mySprite.z = 10
let cursor_point = sprites.create(img`
    b b b 
    b b b 
    b b b 
    `, SpriteKind.Player)
cursor_point.setFlag(SpriteFlag.Invisible, true)
cursor_point.z = 100
Tilegrid = sprites.create(img`
    1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 
    `, SpriteKind.Player)
Tilegrid.setFlag(SpriteFlag.RelativeToCamera, true)
let Zombie_Spawn_Intervals = 9000
suns = 50
load_plant_bar()
let numbr_font = [
img`
    . . 1 1 1 . . . 
    . 1 . . 1 1 . . 
    1 1 . . . 1 1 . 
    1 1 . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 . . 1 . . 
    . . 1 1 1 . . . 
    . . . . . . . . 
    `,
img`
    . . . 1 1 . . . 
    . . 1 1 1 . . . 
    . . . 1 1 . . . 
    . . . 1 1 . . . 
    . . . 1 1 . . . 
    . . . 1 1 . . . 
    . 1 1 1 1 1 1 . 
    . . . . . . . . 
    `,
img`
    . 1 1 1 1 1 . . 
    1 1 . . . 1 1 . 
    . . . . 1 1 1 . 
    . . 1 1 1 1 . . 
    . 1 1 1 1 . . . 
    1 1 1 . . . . . 
    1 1 1 1 1 1 1 . 
    . . . . . . . . 
    `,
img`
    . 1 1 1 1 1 1 . 
    . . . . 1 1 . . 
    . . . 1 1 . . . 
    . . 1 1 1 1 . . 
    . . . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 1 1 1 . . 
    . . . . . . . . 
    `,
img`
    . . . 1 1 1 . . 
    . . 1 1 1 1 . . 
    . 1 1 . 1 1 . . 
    1 1 . . 1 1 . . 
    1 1 1 1 1 1 1 . 
    . . . . 1 1 . . 
    . . . . 1 1 . . 
    . . . . . . . . 
    `,
img`
    1 1 1 1 1 1 . . 
    1 1 . . . . . . 
    1 1 1 1 1 1 . . 
    . . . . . 1 1 . 
    . . . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 1 1 1 . . 
    . . . . . . . . 
    `,
img`
    . . 1 1 1 1 . . 
    . 1 1 . . . . . 
    1 1 . . . . . . 
    1 1 1 1 1 1 . . 
    1 1 . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 1 1 1 . . 
    . . . . . . . . 
    `,
img`
    1 1 1 1 1 1 1 . 
    1 1 . . . 1 1 . 
    . . . . 1 1 . . 
    . . . 1 1 . . . 
    . . 1 1 . . . . 
    . . 1 1 . . . . 
    . . 1 1 . . . . 
    . . . . . . . . 
    `,
img`
    . 1 1 1 1 1 . . 
    1 1 . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 1 1 1 . . 
    1 1 . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 1 1 1 . . 
    . . . . . . . . 
    `,
img`
    . 1 1 1 1 1 . . 
    1 1 . . . 1 1 . 
    1 1 . . . 1 1 . 
    . 1 1 1 1 1 1 . 
    . . . . . 1 1 . 
    . . . . 1 1 . . 
    . 1 1 1 1 . . . 
    . . . . . . . . 
    `
]
score_spawn("" + suns, 50, 9, "Suns")
timer.after(30000, function () {
    zombie_attack_time = 0
    start_zombie_spawn = true
    for (let index = 0; index < 4; index++) {
        music.play(music.createSoundEffect(WaveShape.Sine, 963, 963, 0, 167, 2000, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 192
    export const ARCADE_SCREEN_HEIGHT = 144
}
game.onUpdate(function () {
    cursor_point.setPosition(mySprite.x, mySprite.y - 3)
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
        tiles.placeOnTile(Tilegrid, tiles.getTileLocation(tiles.locationXY(tiles.locationOfSprite(mySprite), tiles.XY.column), tiles.locationXY(tiles.locationOfSprite(mySprite), tiles.XY.row)))
        Tilegrid.setFlag(SpriteFlag.Invisible, false)
    } else {
        Tilegrid.setFlag(SpriteFlag.Invisible, true)
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Card)) {
        if (sprites.readDataBoolean(value4, "On?")) {
            if (cursor_point.overlapsWith(value4)) {
                value4.y = 130
            } else {
                value4.y = 134
            }
        } else {
            value4.y = 140
        }
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Plant)) {
        if (!(sprites.readDataBoolean(value5, "Planted"))) {
            value5.setPosition(mySprite.x, mySprite.y)
            grabbing_plant = true
        } else {
            grabbing_plant = false
        }
    }
    if (grabbing_plant) {
        mySprite.setImage(img`
            . . . . . . . . . . . . 
            . . . . f f . . . . . . 
            . . . f 1 1 f f f f . . 
            . . . f 1 1 f 1 1 f f . 
            . . . f 1 1 f 1 1 1 f . 
            . f f f 1 1 f 1 1 1 f . 
            . f 1 1 f 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 f . 
            . . . f f f f f f f . . 
            `)
    } else {
        mySprite.setImage(img`
            . . . . f f . . . . . . 
            . . . f 1 1 f . . . . . 
            . . . f 1 1 f . . . . . 
            . . . f 1 1 f . . . . . 
            . . . f 1 1 f . . . . . 
            f f f f 1 1 f f f f f . 
            f 1 1 1 f 1 1 f 1 1 f . 
            f 1 1 1 1 1 1 f 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 f . 
            . . . f f f f f f f . . 
            `)
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value5, "Type") == 1) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                ................
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeeff..
                ..ffffff11eeeef.
                .....ff211efeeef
                ....fef211efefef
                ....fef21eefefef
                ....fefeeeefefef
                ....fbff888fbb8f
                ....fffffffffff.
                ......feeefeeef.
                `,img`
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeef...
                ..ffffff11eeeff.
                .....fff11efeeef
                .....ff221efeeef
                ....fefe22eeffef
                ...feefee2eeefbb
                ...fbffeeee888ff
                ...ff.ff8888888f
                ......fffffffff.
                .....feeef.feeef
                `,img`
                ................
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeeff..
                ..ffffff11eeeef.
                .....ff211efeeef
                ....fef211efefef
                ....fef21eefefef
                ....fefeeeefefef
                ....fbff888fbb8f
                ....fffffffffff.
                ......feeefeeef.
                `,img`
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeef...
                ..ffffff11eeef..
                ......ff1feeef..
                ......f21fefeef.
                ......f2ffefeef.
                ......f2fbbeeef.
                ......feeeeee8f.
                ......ff888888f.
                ......fffffffff.
                .......fefeeef..
                `],
            1000,
            characterAnimations.rule(Predicate.MovingLeft)
            )
        } else if (sprites.readDataNumber(value5, "Type") == 1) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                ................
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeeff..
                ..ffffff11eeeef.
                .....ff211efeeef
                ....fef211efefef
                ....fef21eefefef
                ....fefeeeefefef
                ....fbff888fbb8f
                ....fffffffffff.
                ......feeefeeef.
                `,img`
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeef...
                ..ffffff11eeeff.
                .....fff11efeeef
                .....ff221efeeef
                ....fefe22eeffef
                ...feefee2eeefbb
                ...fbffeeee888ff
                ...ff.ff8888888f
                ......fffffffff.
                .....feeef.feeef
                `,img`
                ................
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeeff..
                ..ffffff11eeeef.
                .....ff211efeeef
                ....fef211efefef
                ....fef21eefefef
                ....fefeeeefefef
                ....fbff888fbb8f
                ....fffffffffff.
                ......feeefeeef.
                `,img`
                ................
                ................
                ................
                .......f........
                ......f.........
                .f..fffff..f....
                ..ffbbbbbff.f...
                .fbbbbbbbbbf....
                fbbbbbbfffbbf...
                fffbbbf111fbf...
                f11fbbf1f1fbf...
                ff1fbbf111fbf...
                f11fbbbfffbbf...
                fffbbbbbbbbbf...
                .fbffffbbbff....
                .fb1ff1bffeef...
                ..ffffff11eeef..
                ......ff1feeef..
                ......f21fefeef.
                ......f2ffefeef.
                ......f2fbbeeef.
                ......feeeeee8f.
                ......ff888888f.
                ......fffffffff.
                .......fefeeef..
                `],
            1000,
            characterAnimations.rule(Predicate.MovingLeft)
            )
        }
    }
})
game.onUpdateInterval(Zombie_Spawn_Intervals, function () {
    if (start_zombie_spawn) {
        if (Math.percentChance(80)) {
            zombie_spawning_system()
        }
        if (Zombie_Spawn_Intervals == 1500) {
            timer.background(function () {
                for (let index = 0; index < randint(1, 3); index++) {
                    zombie_spawning_system()
                    pause(2000)
                }
            })
        }
    }
})
game.onUpdateInterval(10000, function () {
    sun = sprites.create(img`
        1 1 . 1 1 1 . 1 1 
        1 . f f f f f . 1 
        . f 3 3 3 3 3 f . 
        1 f 3 3 3 3 3 f 1 
        1 f 3 3 3 3 3 f 1 
        1 f 3 3 3 3 3 f 1 
        . f 3 3 3 3 3 f . 
        1 . f f f f f . 1 
        1 1 . 1 1 1 . 1 1 
        `, SpriteKind.Sun)
    sun.setPosition(randint(16, 128), 0)
    sun.vy = 25
})
game.onUpdateInterval(1000, function () {
    if (start_zombie_spawn) {
        if (zombie_attack_time < 210) {
            zombie_attack_time += 1
            if (zombie_attack_time >= 210) {
                zombie_attack_time = 210
                sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
                start_zombie_spawn = false
                timer.after(2000, function () {
                    game.gameOver(true)
                })
            } else if (zombie_attack_time == 130) {
                start_zombie_spawn = false
                new_sprite_image_text = sprites.create(img`
                    ................................................................................................................................................................
                    .....ffff.2ffffffffffffffffffff2ffffffffffffffffffff2..ffffffff2..22222ffff2fffffffffffffffffffff..fffffff...fffffffffffffffff22fff2fffff2ffffffffffffffffffff..
                    ...2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..
                    ...ff222ffff2f2222f2ff222f2222ff22f2f2f222ff2f22222ffff222f222fffffffff222ff22f22f2222fff222ff222ffffff222fff222ff22ff22ff2222ff222ff22fff22222f22ff22ff2ff222f.
                    ...ff222fff22f2222f2f2222f22ffff222222f222ff2f222fffff2222f222fff2222f2222ff22f22f2222f2f2fff2222ff22f2222fff222f22222222f2222f2222f222ff222222f2f2222ff2f2222f.
                    ..2f2222fff22f2f2f2222ffff22ffff222222f222ff2f222fffff2ff222fffff2222f2ff2f222222f2f22f2f2ff22fffff2222ffffff222f22f222f222ff222ff2f222ff2fff2ff2f222222222ffff.
                    ..ff2222fff2222f2f2222ffff222fff22222222f2f2222222fff22ff222ffffff22f22ff2f2222222222f222222f22ffff22f22ffff22f2f222222222222f2fff2f2f2f22fff2222f2f2222f22ffff.
                    ..ff2f22fff2f22f2f2222f2222fffff22222f22f2f222222ffff2fff22222fff22ff2fff2f22222222f2f2222ffff22fff2fff22fff22f2f2222222f222ff2ff2222f2f22fff2f22f2f222222f222f.
                    .2ff2222fff2f2222f2f2ff2222fffff22222f2222f222f2fffff2ff2222fffff22ff2ff22222222222f2f2222ffff22fff2fff22fff2222f22ff22ff222f22ff2f2222f2fff22f22f2f2f22f2ff22f.
                    .ff22f22ff22f222222f2222f222fff22222ff2f22f222f222fff2222f22ffff2222f2222f2222f222222f2f222f2222ff22f2222fff2f2222fff2fff2f2222222f2ff2f222f22f2f2222f22f2222ff.
                    .ff22f22ff22f2ff22fff22ffffffffffffff22f22f222fffffff222ff22ffff2222f222ff2f22f2222fff2fffff222fff22f222fff22f2222ff22fff2ff2f22fff2f22f22ff2ff2f2222f2ff222fff.
                    .fffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ff2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..
                    ..ffffff2ffff22fff22fffffff2..fffffffffffffffffff2...ff2fff2...fff22fff2ffffffffffffffffff22fff..fffffff..ffffffff2ff22fffff22ff2ffffffffffffffffffffff2ffff2...
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    `, SpriteKind.Other)
                new_sprite_image_text.z = 200
                Zombie_Spawn_Intervals = 1500
                timer.after(7000, function () {
                    new_sprite_image_text.setFlag(SpriteFlag.Invisible, true)
                    timer.after(1500, function () {
                        new_sprite_image_text.setFlag(SpriteFlag.Invisible, false)
                        new_sprite_image_text.setImage(img`
                            ........................ff....ffffffffff...fffffffffff.....fffff...ffffff..........fffff..fff.ffff......fffffffffffffffffffffffff.fffff.........................
                            ..................fffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................
                            .................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......................
                            .................fffffffffffffff22fffffffffffffffffffffffffff2fffffffffffffff..fffffffffffffffffffffffffff2ffffffffffffffffffffffffffffffff.....................
                            ................ffff2222222fffff2222222fff2222fff2222fffff222222fff222222fffff.ffff22222fff2fff222fffff222222ff22222ff22222f22222222222fffff....................
                            ................ffff2222222222f22222222ff22222fff2222ffff2222222fff222222ffffffffff22222fff2fff2222fff2222222ff22222ff22222f22222222222ffffff...................
                            ................ffff2222222222f22222222f2222222ff2222ffff2222222fff222222ffffffffff22222ff22fff2222fff2222222ff22222ff22222f22222222222ffffff...................
                            ................ffff2222222222f22222222f2222222ff2222fff22222222fff222222fffffffffff22222f222f22222ff22222222ff22222ff2222ff2222222222fffffff...................
                            ................ffff2222222222ff2222222ff2222222f2222fff22222222fff222222fffffffffff22222f222f22222ff22222222fff2222ff2222ff2222222222fffffff...................
                            ................ffff2222222222fff2222ffff222222222222fff22222222fff222222fffffffffff22222f222f2222fff22222222fff2222ff2222ff2222222222fffffff...................
                            ................ffff222222222ffff2222ffff222222222222fff222ff2222fff22222fffffffffff22222f222f2222fff222ff2222ff2222ff2222ff2222222222fffffff...................
                            ................ffff22222ffffffff2222fff2222222222222fff222ff2222fff22222fffffffffff22222f222f2222fff222ff2222ff2222ff2222ff22222ffffffffffff...................
                            .................fff222222fffffff2222fff2222222222222ff2222ff2222fff22222fffffffffff22222f22222222ff2222ff2222fff222222222ff22222ffffffffffff...................
                            .................fff22222222fffff2222fff22222f2222222ff2222ff2222fff2222fffffff.ffff22222222222222ff2222ff2222fff22222222ffff22222222ffffffff...................
                            .................fff22222222fffff2222ffff2222f2222222ff2222ff2222fff2222fffffff..ffff2222222222222ff2222ff2222fff22222222fff222222222fffffff....................
                            .................fff22222222fffff2222ffff2222ff22222fff2222222222fff2222fffffff..ffff2222222222222ff2222222222fff2222222ffff222222222fffffff....................
                            .................ffff2222222fffff2222ffff2222ff22222fff2222222222fff2222fffffff..ffff222222222222fff2222222222fff2222222fffff2222ff2ffffffff....................
                            .................ffff2222ffffffff2222ffff2222ff22222fff2222222222fff2222fffffff..ffff222222222222fff2222222222ffff222222fffff2222fffffffffff....................
                            ..................fff2222ffffffff2222ffff2222ff22222ff22222222222fff2222ffffffff..fff222222222222ff22222222222ffff222222fffff2222ffffffffff.....................
                            ..................fff2222ffffffff2222ffff2222fff2222ff222222ff2222ff2222fffffffff.ffff22222222222ff222222ff2222fff222222fffff2222ffffffffff.....................
                            ..................fff2222fffffff222222fff2222ffff222ff2222ffff2222ff222222fffffff.ffff22222f22222ff2222ffff2222fff222222fffff22222222ffffff.....................
                            ..................fff2222fffffff222222ffff222ffff222fff222ffff2222ff222222222fffffffff2222ff2222ffff222ffff2222ffff2222ffffff22222222ffffff.....................
                            ..................ffff222fffffff222222ffff22ffffff22fff222fffff222ff222222222fffffffff2222ff2222ffff222fffff222ffff2222ffffff22222222fffffff....................
                            ..................ffff22ffffffff22222fffff22ffffff22fff22ffffff222fff2222222ffffffffffff22ff222fffff22ffffff222fffff22ffffffff2222222fffffff....................
                            ...................ffffffffffffff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffffff....................
                            ...................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff....................
                            ....................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..fffffffffffffffffffffffffffffffffffffffffffffffffffffff....................
                            .....................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff...fffffffffffffffffffffffffffffffffffffffffffffffffffff.....................
                            ......................ffffffff..ffffffffffffffffffffffffffffffffffffffffffffffffff.....fffffffffffffffffffffffffffffffffffffffffffffffffff......................
                            .......................ffffff....ffffffffffffffffffffffffffffffffffffffffffffffff.......fffffffffffffffffffffffffffffffffff....ffffffffff.......................
                            .........................ff.......ffffff.....f.......fffffff.....fffffffffff..............fffffffff...fff.....fffff..fffff.......ffffff.........................
                            ................................................................................................................................................................
                            `)
                        new_sprite_image_text.y += -10
                        start_zombie_spawn = true
                        timer.after(1000, function () {
                            sprites.destroy(new_sprite_image_text)
                        })
                    })
                })
            }
        }
    }
})
